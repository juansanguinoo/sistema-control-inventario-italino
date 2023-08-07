import "./styles.css";
import User from "../../assets/User.svg";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { CardInformation } from "../../components/cards/CardInformation";
import { PageTitle } from "../../components/titles/PageTitle";
import { HeaderButton } from "../../components/buttons/HeaderButton";
import { useState, useEffect } from "react";
import { ModalCustomers } from "./components/Modal";
import { TableInformation } from "../../components/tables/TableInformation";
import { customerColumns } from "../../utils/columnsDataTable";
import { CustomerModel } from "../../../domain/models/CustomerModel";
import { useGetCustomerByUser } from "../../hooks/useGetCustomerByUser";
import { FilterMessage } from "../orders/components/FilterMessage";
import Swal from "sweetalert2";
import { Dispatch } from "redux";
import {
  getCustomerInfo,
  getCustomersByNameOrNit,
  updateCustomer,
} from "../../../store/actions/customerActions";
import { useGetCustomerInformation } from "../../hooks/useGetCustomerInformation";

export const Customers = () => {
  const dispatch = useDispatch<Dispatch<any>>(); // eslint-disable-line
  const { customers } = useGetCustomerByUser();
  const [customerData, setCustomerData] = useState<CustomerModel>({
    id: 0,
    userId: 0,
    nameCustomer: "",
    nitCustomer: "",
    addressCustomer: "",
    phoneCustomer: "",
    statusCustomer: "Activo",
    emailCustomer: "",
  });
  const [actions, setActions] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [deleteAction, setDeleteAction] = useState<boolean>(false);
  const [search, setSearch] = useState("");
  const { customerInfo } = useGetCustomerInformation();
  const navbarOpen = useSelector(
    (state: RootState) => state.navbarReducer.stateOpen
  );
  const navbarClass = navbarOpen ? "expanded" : "collapsed";

  const openModal = () => {
    setShowModal(true);
  };

  const handleSearch = () => {
    dispatch(getCustomersByNameOrNit(search));
  };

  const closeModal = () => {
    setCustomerData({
      userId: 0,
      nameCustomer: "",
      nitCustomer: "",
      addressCustomer: "",
      phoneCustomer: "",
      statusCustomer: "Activo",
      emailCustomer: "",
    });
    setShowModal(false);
    setActions("");
  };

  useEffect(() => {
    dispatch(getCustomerInfo());
    if (deleteAction) {
      Swal.fire({
        title: "¿Estás seguro?",
        text: "¡No podrás deshacer esta acción!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "¡Sí, eliminar!",
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(updateCustomer(customerData.id!, customerData));
          setDeleteAction(false);
        }
      });
    }
  }, [deleteAction, dispatch, customerData]);

  const handleEditAction = (params: any) => {
    setCustomerData({
      ...params.row,
      userId: params.row.userId.id_user,
      id: params.row.id,
    });
    setActions("edit");
    openModal();
  };

  const handlePreviewAction = (params: any) => {
    setCustomerData(params.row);
    setActions("preview");
    openModal();
  };

  const handleDeleteAction = (params: any) => {
    setCustomerData({
      ...params.row,
      statusCustomer: "Inactivo",
      id: params.row.id,
      userId: params.row.userId.id_user,
    });
    setDeleteAction(true);
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
        <CardInformation
          icon={User}
          titles={[
            "Todos los clientes",
            "Clientes activos",
            "Clientes inactivos",
          ]}
          data={[
            customerInfo?.totalCustomers,
            customerInfo?.activeCustomers,
            customerInfo?.inactiveCustomers,
          ]}
        />
        <CardInformation
          icon={User}
          titles={["Clientes agregados en el último mes"]}
          data={[customerInfo?.ultimateCustomersAdded]}
        />
        <div className="main-reports">
          <div className="main-reports-search-container">
            <input
              type="text"
              placeholder="Buscar por nombre o NIT"
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
        {customers.length > 0 ? (
          <TableInformation
            categories={customers}
            columns={customerColumns}
            deleteCategory={handleDeleteAction}
            handleEditAction={handleEditAction}
            handlePreviewAction={handlePreviewAction}
          />
        ) : (
          <div className="customers-nocustomers">
            <FilterMessage
              messageTitle={"¿No tienes clientes aún?"}
              messageParagraph={"Una vez crees clientes, las podrás ver aquí."}
            />
            <div className="customer-add-customer">
              <HeaderButton
                title="Crear un nuevo cliente"
                handleFunction={openModal}
              />
            </div>
          </div>
        )}
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
