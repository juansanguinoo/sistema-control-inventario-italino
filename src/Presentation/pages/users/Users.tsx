import "./styles.css";
import Profile from "../../assets/Profile.svg";
import { useDispatch, useSelector } from "react-redux";
import { PageTitle } from "../../components/titles/PageTitle";
import { RootState } from "../../../store/store";
import { HeaderButton } from "../../components/buttons/HeaderButton";
import { CardInformation } from "../../components/cards/CardInformation";
import { TableInformation } from "../../components/tables/TableInformation";
import { Dispatch } from "redux";
import { useEffect, useState } from "react";
import { userColumns } from "../../utils/columnsDataTable";
import { getAllUsers, updateUser } from "../../../store/actions/userAction";
import { ModalUsers } from "./components/Modal";
import { UserModel } from "../../../domain/models/UserModel";
import Swal from "sweetalert2";

export const Users = () => {
  const [userData, setUserData] = useState<UserModel>({
    id: 0,
    nameUser: "",
    phoneUser: "",
    emailUser: "",
    passwordUser: "",
    statusUser: "Inactivo",
    roleId: 0,
  });
  const dispatch = useDispatch<Dispatch<any>>(); // eslint-disable-line
  const users = useSelector((state: RootState) => state.userReducer.users);
  const navbarOpen = useSelector(
    (state: RootState) => state.navbarReducer.stateOpen
  );
  const navbarClass = navbarOpen ? "expanded" : "collapsed";
  const [showModal, setShowModal] = useState<boolean>(false);
  const [actions, setActions] = useState<string>("");
  const [deleteAction, setDeleteAction] = useState<boolean>(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setUserData({
      id: 0,
      nameUser: "",
      phoneUser: "",
      emailUser: "",
      passwordUser: "",
      statusUser: "Inactivo",
      roleId: 0,
    });
    setActions("");
    setShowModal(false);
  };

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  useEffect(() => {
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
          dispatch(updateUser(userData.id!, userData));
          setDeleteAction(false);
        }
      });
    }
  }, [deleteAction, dispatch, userData]);

  const handleEditAction = (params: any) => {
    setUserData(params.row);
    setActions("edit");
    openModal();
  };

  const handlePreviewAction = (params: any) => {
    setUserData(params.row);
    setActions("preview");
    openModal();
  };

  const handleDeleteAction = (params: any) => {
    setUserData({
      ...params.row,
      statusUser: "Inactivo",
      roleId: params.row.roleId.id_role,
    });
    setDeleteAction(true);
  };

  // get the active users
  const activeUsers = users.filter((user) => user.statusUser == "Activo");

  // get the inactive users
  const inactiveUsers = users.filter((user) => user.statusUser == "Inactivo");

  return (
    <div className={`user-container ${navbarClass}`}>
      <div className="user-header">
        <PageTitle title="Usuarios" />
        <HeaderButton
          title="Crear un nuevo usuario"
          handleFunction={openModal}
        />
      </div>
      <div className="user-main">
        <CardInformation
          icon={Profile}
          titles={["Total de usuarios"]}
          data={[users.length]}
        />
        <CardInformation
          icon={Profile}
          titles={["Usuarios activos", "Usuarios inactivos"]}
          data={[activeUsers.length, inactiveUsers.length]}
        />
        <TableInformation
          categories={users}
          columns={userColumns}
          deleteCategory={handleDeleteAction}
          handleEditAction={handleEditAction}
          handlePreviewAction={handlePreviewAction}
        />
        {showModal && (
          <ModalUsers
            onCloseModal={closeModal}
            initialState={userData}
            action={actions}
          />
        )}
      </div>
    </div>
  );
};
