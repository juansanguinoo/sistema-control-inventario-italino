import "./styles.css";
import Bag from "../../assets/Bag.svg";
import { useDispatch, useSelector } from "react-redux";
import { CardInformation } from "../../components/cards/CardInformation";
import { PageTitle } from "../../components/titles/PageTitle";
import { RootState } from "../../../store/store";
import { HeaderButton } from "../../components/buttons/HeaderButton";
import { useState } from "react";
import { ModalOrders } from "./components/Modal";
import { useGetOrders } from "../../hooks/useGetOrders";
import { FilterMessage } from "./components/FilterMessage";
import { TableInformation } from "../../components/tables/TableInformation";
import { deleteCategory } from "../../../store/actions/categoryActions";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { Dispatch } from "redux";
import { updateOrder } from "../../../store/actions/orderActions";

const moneyFormat = (value: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
};

export const Orders = () => {
  const dispatch = useDispatch<Dispatch<any>>(); // eslint-disable-line
  const [showModal, setShowModal] = useState<boolean>(false);
  const navbarOpen = useSelector(
    (state: RootState) => state.navbarReducer.stateOpen
  );
  const navigate = useNavigate();
  const { orders } = useGetOrders();
  const navbarClass = navbarOpen ? "expanded" : "collapsed";

  const orderColumns = [
    {
      field: "Customer",
      headerName: "Nombre del cliente",
      width: 260,
      renderCell: (params: any) => {
        return <div>{params.row.customer.name_customer}</div>;
      },
    },
    {
      field: "User",
      headerName: "Nombre del vendedor",
      width: 260,
      renderCell: (params: any) => {
        return <div>{params.row.user.name_user}</div>;
      },
    },
    {
      field: "createdAt",
      headerName: "Fecha de la orden",
      width: 200,
      renderCell: (params: any) => {
        return (
          <div>
            {moment(params.row.createdAt).format("DD MMM YYYY - h:mm a")}
          </div>
        );
      },
    },
    {
      field: "typeOrder",
      headerName: "Tipo de orden",
      width: 130,
    },
    {
      field: "totalOrder",
      headerName: "Total de la orden",
      width: 160,
      // format to money
      renderCell: (params: any) => {
        return <div>{moneyFormat(params.row.totalOrder)}</div>;
      },
    },
    {
      field: "ActionOrder",
      headerName: "Acciones de estado",
      width: 180,
      renderCell: (params: any) => {
        // show a select to the next options: "Pendiente", "En proceso", "Entregado"
        return (
          <div className="cellWithStatus">
            <select
              name="statusOrder"
              id={`statusOrder${params.row.id}`}
              className="cellWithSelect"
              value={params.row.statusOrder}
              onChange={(e) => {
                const newOrder = {
                  ...params.row,
                  statusOrder: e.target.value,
                };
                dispatch(updateOrder(newOrder));
                // console.log(newOrder);
              }}
            >
              <option value="Pendiente">Pendiente</option>
              <option value="En-proceso">En-proceso</option>
              <option value="Entregado">Entregado</option>
            </select>
          </div>
        );
      },
    },
    {
      field: "statusOrder",
      headerName: "Estado de la orden",
      width: 170,
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

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handlePreviewAction = (params: any) => {
    navigate(`orderDetail/${params.id}`);
  };

  return (
    <div className={`orders-container ${navbarClass}`}>
      <div className="orders-header">
        <PageTitle title="Ordenes" />
        <HeaderButton
          title="Crear una nueva orden"
          handleFunction={openModal}
        />
      </div>
      <div className="orders-main">
        <CardInformation icon={Bag} />
        <CardInformation icon={Bag} />
        {orders.length > 0 ? (
          <TableInformation
            categories={orders}
            columns={orderColumns}
            deleteCategory={deleteCategory}
            showDelete={false}
            handlePreviewAction={handlePreviewAction}
          />
        ) : (
          <div className="orders-noorders">
            <FilterMessage
              messageTitle={"¿No tienes ordenes aún?"}
              messageParagraph={"Una vez crees ordenes, las podrás ver aquí."}
            />
            <div className="order-add-order">
              <HeaderButton
                title="Crear una nueva orden"
                handleFunction={openModal}
              />
            </div>
          </div>
        )}
        {showModal && <ModalOrders onCloseModal={closeModal} />}
      </div>
    </div>
  );
};
