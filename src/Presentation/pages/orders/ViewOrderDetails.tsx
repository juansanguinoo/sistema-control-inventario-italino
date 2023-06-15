import { HeaderButton } from "../../components/buttons/HeaderButton";
import { PageTitle } from "../../components/titles/PageTitle";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { TableInformation } from "../../components/tables/TableInformation";
import { useGetOrders } from "../../hooks/useGetOrders";
import { orderDetailColumns } from "../../utils/columnsDataTable";
import { deleteCategory } from "../../../store/actions/categoryActions";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { OrderResponseModel } from "../../../domain/models/OrderResponseModel";
import { CardInformation } from "../../components/cards/CardInformation";
import ClientIcon from "../../assets/userClientIcon.svg";
import { Customer } from "../../../domain/models/Customer";
import LocationClientIcon from "../../assets/iconText.svg";

const moneyFormat = (value: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
};

export const ViewOrderDetails = () => {
  const navbarOpen = useSelector(
    (state: RootState) => state.navbarReducer.stateOpen
  );
  const { orders } = useGetOrders();
  const params = useParams();
  const [orderData, setOrderData] = useState<OrderResponseModel>();
  const [customer, setCustomer] = useState<Customer>();

  const navbarClass = navbarOpen ? "expanded" : "collapsed";

  const getOrderById = () => {
    const orderFilter = orders.find(
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
    const customerFilter = orderData?.customer;
    if (customerFilter) {
      setCustomer(customerFilter);
    }
  }, [orders]);

  return (
    <div className={`orders-container ${navbarClass}`}>
      <div className="orders-header">
        <PageTitle title="Ordenes" />
        <HeaderButton
          title="Crear una nueva orden"
          handleFunction={() => console.log("hola")}
        />
      </div>
      <div className="orders-main">
        <CardInformation
          icon={ClientIcon}
          titles={["Telefono", "Correo", "Dirección del cliente"]}
          data={[
            customer?.phone_customer,
            "customer@mail.com",
            customer?.address_customer,
          ]}
        />
        <CardInformation
          icon={LocationClientIcon}
          titles={["Total productos", "Total a pagar", "Estado de la orden"]}
          data={[
            orderData?.orderDetails.length,
            moneyFormat(orderData?.totalOrder!),
            orderData?.statusOrder,
          ]}
        />
        <TableInformation
          categories={orderData?.orderDetails}
          columns={orderDetailColumns}
          deleteCategory={deleteCategory}
          showActions={false}
        />
      </div>
    </div>
  );
};
