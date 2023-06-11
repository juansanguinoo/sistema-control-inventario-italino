import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { CardInformation } from "../../components/cards/CardInformation";
import { PageTitle } from "../../components/titles/PageTitle";
import "./styles.css";
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
        <CardInformation />
        <CardInformation />
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
