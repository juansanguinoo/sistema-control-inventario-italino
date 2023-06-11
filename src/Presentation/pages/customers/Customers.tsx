import "./styles.css";
import User from "../../assets/User.svg";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { CardInformation } from "../../components/cards/CardInformation";
import { PageTitle } from "../../components/titles/PageTitle";
import { HeaderButton } from "../../components/buttons/HeaderButton";
import { useEffect, useState } from "react";
import { ModalCustomers } from "./components/Modal";
import { Dispatch } from "redux";
import {
  getCustomerByUserId,
  deleteCustomer,
} from "../../../store/actions/customerActions";
import { TableInformation } from "../../components/tables/TableInformation";
import { customerColumns } from "../../utils/columnsDataTable";
import { CustomerModel } from "../../../domain/models/CustomerModel";

export const Customers = () => {
  const [customerData, setCustomerData] = useState<CustomerModel>({
    userId: 0,
    nameCustomer: "",
    nitCustomer: "",
    addressCustomer: "",
    phoneCustomer: "",
    statusCustomer: "Inactive",
  });
  const [actions, setActions] = useState<string>("");
  const dispatch = useDispatch<Dispatch<any>>(); // eslint-disable-line
  const [showModal, setShowModal] = useState<boolean>(false);
  const navbarOpen = useSelector(
    (state: RootState) => state.navbarReducer.stateOpen
  );
  const navbarClass = navbarOpen ? "expanded" : "collapsed";

  const getUser = useSelector((state: RootState) => state.userReducer.user);
  const customers = useSelector(
    (state: RootState) => state.customerReducer.customers
  );

  useEffect(() => {
    if (getUser?.id) {
      dispatch(getCustomerByUserId(getUser.id));
    }
  }, []);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleEditAction = (params: any) => {
    setCustomerData(params.row);
    setActions("edit");
    openModal();
  };

  const handlePreviewAction = (params: any) => {
    setCustomerData(params.row);
    setActions("preview");
    openModal();
  };

  // get the active customers
  const activeCustomers = customers.filter(
    (customer) => customer.statusCustomer === "Active"
  );

  // get the inactive customers
  const inactiveCustomers = customers.filter(
    (customer) => customer.statusCustomer === "Inactive"
  );

  // get the createdAt date of the customers reducer
  const createdAt = customers.map((customer) => customer.createdAt);
  console.log(createdAt);

  // get the total of customers added in the last 30 days
  const totalCustomers = createdAt.filter((date) => {
    if (date === undefined) {
      return false;
    }

    const today = new Date();
    const dateCustomer = new Date(date);
    const difference = today.getTime() - dateCustomer.getTime();
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    return days <= 30;
  });

  return (
    <div className={`customer-container ${navbarClass}`}>
      <div className="customer-header">
        <PageTitle title="Clientes" />
        <HeaderButton
          title="Crear un nuevo cliente"
          handleFunction={openModal}
        />
      </div>
      <div className="customer-main">
        <CardInformation
          icon={User}
          titles={[
            "Todos los clientes",
            "Clientes activos",
            "Clientes inactivos",
          ]}
          data={[
            customers.length,
            activeCustomers.length,
            inactiveCustomers.length,
          ]}
        />
        <CardInformation
          icon={User}
          titles={["Clientes agregados en el último mes"]}
          data={[totalCustomers.length]}
        />
        <TableInformation
          categories={customers}
          columns={customerColumns}
          deleteCategory={deleteCustomer}
          handleEditAction={handleEditAction}
          handlePreviewAction={handlePreviewAction}
        />
        {showModal && (
          <ModalCustomers
            onCloseModal={closeModal}
            initialState={customerData}
            action={actions}
          />
        )}
      </div>
    </div>
  );
};
