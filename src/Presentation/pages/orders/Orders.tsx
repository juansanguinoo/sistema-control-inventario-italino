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
import { OrderRequest } from "../../../domain/models/OrderRequest";
import { IInventoryModelSelected } from "../../interfaces/IInventoryModelSelected";

const moneyFormat = (value: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
};

export const Orders = () => {
  const dispatch = useDispatch<Dispatch<any>>(); // eslint-disable-line
  const [showModalCreate, setShowModalCreate] = useState<boolean>(false);
  const [showModalEdit, setShowModalEdit] = useState<boolean>(false);
  const navbarOpen = useSelector(
    (state: RootState) => state.navbarReducer.stateOpen
  );
  const navigate = useNavigate();
  const { orders } = useGetOrders();
  const navbarClass = navbarOpen ? "expanded" : "collapsed";
  const [orderData, setOrderData] = useState<OrderRequest>({
    id: 0,
    customerId: 0,
    userId: 0,
    statusOrder: "Pendiente",
    paymentOrder: "",
    typeOrder: "",
    totalOrder: 0,
    orderDetails: [],
  });
  const [selectedValues, setSelectedValues] = useState<
    IInventoryModelSelected[]
  >([]);

  const orderColumns = [
    {
      field: "referenceOrder",
      headerName: "Referencia",
      width: 120,
    },
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
      renderCell: (params: any) => {
        return <div>{moneyFormat(params.row.totalOrder)}</div>;
      },
    },
    {
      field: "ActionOrder",
      headerName: "Acciones de estado",
      width: 180,
      renderCell: (params: any) => {
        return (
          <div className="cellWithStatus">
            {params.row.statusOrder === "Cancelado" ? null : (
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
                }}
              >
                <option value="Pendiente">Pendiente</option>
                <option value="En-proceso">En-proceso</option>
                <option value="Entregado">Entregado</option>
              </select>
            )}
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
    setShowModalCreate(true);
  };

  const openModalEdit = () => {
    setShowModalEdit(true);
  };

  const closeModal = () => {
    setShowModalCreate(false);
  };

  const closeModalEdit = () => {
    setShowModalEdit(false);
  };

  const handleEditAction = (params: any) => {
    setOrderData({
      id: params.row.id,
      customerId: params.row.customer.id_customer,
      userId: params.row.user.id_user,
      statusOrder: params.row.statusOrder,
      paymentOrder: params.row.paymentOrder,
      typeOrder: params.row.typeOrder,
      totalOrder: params.row.totalOrder,
      orderDetails: params.row.orderDetails,
    });
    setSelectedValues(
      params.row.orderDetails.map((item: any) => {
        return {
          inventoryId: item.inventory.id_inventory,
          nameInventory: item.inventory.name_inventory,
          imageInventory: item.inventory.image_inventory,
          sellingPriceInventory: item.inventory.selling_price_inventory,
          stockInventory: item.inventory.stock_inventory,
          quantity: item.quantity,
          subTotal: item.inventory.selling_price_inventory * item.quantity,
        };
      })
    );
    openModalEdit();
  };

  const handlePreviewAction = (params: any) => {
    navigate(`orderDetail/${params.id}`);
  };

  const deliveredOrders = orders.filter(
    (order) => order.statusOrder === "Entregado"
  );

  const inProcessOrders = orders.filter(
    (order) => order.statusOrder === "En-proceso"
  );

  const pendingOrders = orders.filter(
    (order) => order.statusOrder === "Pendiente"
  );

  const canceledOrders = orders.filter(
    (order) => order.statusOrder === "Cancelado"
  );

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
        <CardInformation
          icon={Bag}
          titles={[
            "Total de ordenes",
            "Ordenes entregadas",
            "Ordenes en proceso",
          ]}
          data={[orders.length, deliveredOrders.length, inProcessOrders.length]}
        />
        <CardInformation
          icon={Bag}
          titles={["Ordenes pendientes", "Ordenes canceladas"]}
          data={[pendingOrders.length, canceledOrders.length]}
        />
        {orders.length > 0 ? (
          <TableInformation
            categories={orders}
            columns={orderColumns}
            deleteCategory={deleteCategory}
            showDelete={false}
            handlePreviewAction={handlePreviewAction}
            handleEditAction={handleEditAction}
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
        {showModalCreate && <ModalOrders onCloseModal={closeModal} />}
        {showModalEdit && (
          <ModalOrders
            onCloseModal={closeModalEdit}
            initialData={orderData}
            initialSelectedValues={selectedValues}
            isEdit={true}
          />
        )}
      </div>
    </div>
  );
};
