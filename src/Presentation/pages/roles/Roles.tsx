import "./styles.css";
import Folder from "../../assets/Folder.svg";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { RootState } from "../../../store/store";
import { useEffect, useState } from "react";
import { PageTitle } from "../../components/titles/PageTitle";
import { HeaderButton } from "../../components/buttons/HeaderButton";
import { CardInformation } from "../../components/cards/CardInformation";
import { TableInformation } from "../../components/tables/TableInformation";
import { roleColumns } from "../../utils/columnsDataTable";
import { getAllRoles, updateRole } from "../../../store/actions/roleActions";
import { ModalRoles } from "./components/Modal";
import { RoleModel } from "../../../domain/models/RoleModel";
import Swal from "sweetalert2";

export const Roles = () => {
  const [roleData, setRoleData] = useState<RoleModel>({
    id: 0,
    nameRole: "",
    descriptionRole: "",
    statusRole: "Inactivo",
    activities: [],
  });
  const dispatch = useDispatch<Dispatch<any>>(); // eslint-disable-line
  const roles = useSelector((state: RootState) => state.roleReducer.roles);
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
    setRoleData({
      id: 0,
      nameRole: "",
      descriptionRole: "",
      statusRole: "Inactivo",
      activities: [],
    });
    setActions("");
    setShowModal(false);
  };

  useEffect(() => {
    dispatch(getAllRoles());
  }, [dispatch]);

  useEffect(() => {
    if (deleteAction) {
      Swal.fire({
        title: "¿Estás seguro?",
        text: "¡No podrás deshacer esta acción!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "!Sí, eliminar!",
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(updateRole(roleData.id!, roleData));
          setDeleteAction(false);
          Swal.fire(
            "¡Eliminado!",
            "Ha sido eliminado correctamente.",
            "success"
          );
        }
      });
    }
  }, [deleteAction, dispatch, roleData]);

  const handleEditAction = (params: any) => {
    setRoleData({
      ...params.row,
      activities: params.row.activities.map(
        (activity: any) => activity.id_activity
      ),
    });
    setActions("edit");
    openModal();
  };

  const handleDeleteAction = (params: any) => {
    setRoleData({
      ...params.row,
      activities: params.row.activities.map(
        (activity: any) => activity.id_activity
      ),
      statusRole: "Inactivo",
    });

    setDeleteAction(true);
  };

  const activeRoles = roles.filter((role) => role.statusRole === "Activo");
  const inactiveRoles = roles.filter((role) => role.statusRole === "Inactivo");

  return (
    <div className={`rol-container ${navbarClass}`}>
      <div className="rol-header">
        <PageTitle title="Roles de usuarios" />
        <HeaderButton title="Crear un nuevo rol" handleFunction={openModal} />
      </div>
      <div className="rol-main">
        <CardInformation
          icon={Folder}
          titles={["Total de roles"]}
          data={[roles.length]}
        />
        <CardInformation
          icon={Folder}
          titles={["Roles activos", "Roles inactivos"]}
          data={[activeRoles.length, inactiveRoles.length]}
        />
        <TableInformation
          categories={roles}
          columns={roleColumns}
          deleteCategory={handleDeleteAction}
          handleEditAction={handleEditAction}
          showView={false}
        />
        {showModal && (
          <ModalRoles
            onCloseModal={closeModal}
            initialState={roleData}
            action={actions}
          />
        )}
      </div>
    </div>
  );
};
