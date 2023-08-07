import { useDispatch, useSelector } from "react-redux";
import { PageTitle } from "../../components/titles/PageTitle";
import { RootState } from "../../../store/store";
import { CardInformation } from "../../components/cards/CardInformation";
import Bag from "../../assets/Bag.svg";
import { TableInformation } from "../../components/tables/TableInformation";
import { useGetOrders } from "../../hooks/useGetOrders";
import { useState } from "react";
import { FilterMessage } from "../orders/components/FilterMessage";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { getOrderByReferenceProductionFilter } from "../../../store/actions/orderActions";
import { Dispatch } from "redux";

export const Production = () => {
  const dispatch = useDispatch<Dispatch<any>>(); // eslint-disable-line
  const [search, setSearch] = useState("");
  const navbarOpen = useSelector(
    (state: RootState) => state.navbarReducer.stateOpen
  );
  const { ordersInfo, ordersToProduction } = useGetOrders();
  const navbarClass = navbarOpen ? "expanded" : "collapsed";
  const navigate = useNavigate();

  const handlePreviewAction = (params: any) => {
    navigate(`productionDetail/${params.id}`);
  };

  const orderColumns = [
    {
      field: "referenceOrder",
      headerName: "Referencia",
      width: 250,
    },
    {
      field: "createdAt",
      headerName: "Fecha de la orden",
      width: 350,
      renderCell: (params: any) => {
        return (
          <div>
            {moment(params.row.createdAt).format("DD MMM YYYY - h:mm a")}
          </div>
        );
      },
    },
    {
      field: "descriptionOrder",
      headerName: "Descripción de la ordén",
      width: 500,
    },
    {
      field: "statusOrder",
      headerName: "Estado de la orden",
      width: 250,
      renderCell: (params: any) => {
        return (
          <div
            className={`cellWithStatus ${params.row.statusOrder.toLowerCase()}`}
          >
            {params.row.statusOrder}
          </div>
        );
      },
    },
  ];

  const handleSearch = () => {
    dispatch(getOrderByReferenceProductionFilter(search));
  };

  return (
    <div className={`orders-container ${navbarClass}`}>
      <div className="orders-header">
        <PageTitle title="Producción" />
      </div>
      <div className="orders-main">
        <CardInformation
          icon={Bag}
          titles={["Total de ordenes", "Ordenes entregadas", "Ordenes salida"]}
          data={[
            ordersInfo?.totalOrders,
            ordersInfo?.totalOrdersPending,
            ordersInfo?.totalOrdersDelivered,
          ]}
        />
        <div className="main-reports">
          <div className="main-reports-search-container">
            <input
              type="text"
              placeholder="Buscar por referencia"
              className="main-reports-search-container-input-text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              className="main-reports-search-container-input-button"
              onClick={handleSearch}
            >
              Buscar
            </button>
          </div>
        </div>
        {ordersToProduction.length > 0 ? (
          <TableInformation
            categories={ordersToProduction}
            columns={orderColumns}
            showDelete={false}
            showEdit={false}
            handlePreviewAction={handlePreviewAction}
          />
        ) : (
          <div className="orders-noorders">
            <FilterMessage
              messageTitle={"¿No tienes ordenes para producción?"}
              messageParagraph={
                "Una vez Entreguen ordenes, las podrás ver aquí."
              }
            />
          </div>
        )}
      </div>
    </div>
  );
};
