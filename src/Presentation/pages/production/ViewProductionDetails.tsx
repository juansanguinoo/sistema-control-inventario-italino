import { useSelector } from "react-redux";
import { PageTitle } from "../../components/titles/PageTitle";
import { RootState } from "../../../store/store";
import { CardInformation } from "../../components/cards/CardInformation";
import { TableInformation } from "../../components/tables/TableInformation";
import { useGetOrders } from "../../hooks/useGetOrders";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { OrderProductionResponseModel } from "../../../domain/models/OrderProductionResponseModel";
import { orderDetailProductionColumns } from "../../utils/columnsDataTable";
import LocationClientIcon from "../../assets/iconText.svg";

export const ViewProductionDetails = () => {
  const navbarOpen = useSelector(
    (state: RootState) => state.navbarReducer.stateOpen
  );
  const { ordersToProduction } = useGetOrders();
  const params = useParams();
  const [orderData, setOrderData] = useState<OrderProductionResponseModel>();
  const navbarClass = navbarOpen ? "expanded" : "collapsed";

  const getOrderById = () => {
    const orderFilter = ordersToProduction.find(
      (order: any) => order.id === Number(params.id)
    );
    if (orderFilter) {
      setOrderData(orderFilter);
    }
  };

  useEffect(() => {
    if (params.id) {
      getOrderById();
    }
  }, [ordersToProduction]);

  useEffect(() => {
    console.log(orderData);
  }, [orderData]);

  return (
    <div className={`orders-container ${navbarClass}`}>
      <div className="orders-header">
        <PageTitle title="Producción" />
      </div>
      <div className="orders-main">
        <CardInformation
          icon={LocationClientIcon}
          titles={["Total productos", "Estado de la orden"]}
          data={[orderData?.orderDetails.length, orderData?.statusOrder]}
        />
        <TableInformation
          categories={orderData?.orderDetails}
          columns={orderDetailProductionColumns}
          showActions={false}
        />
      </div>
    </div>
  );
};
