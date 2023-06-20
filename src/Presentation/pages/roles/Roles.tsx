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
import { deleteCategory } from "../../../store/actions/categoryActions";
import { getAllRoles } from "../../../store/actions/roleActions";
import { ModalRoles } from "./components/Modal";
import { RoleModel } from "../../../domain/models/RoleModel";

export const Roles = () => {
  const [roleData, setRoleData] = useState<RoleModel>({
    nameRole: "",
    descriptionRole: "",
    statusRole: "Inactivo",
    activityId: [],
  });
  const dispatch = useDispatch<Dispatch<any>>(); // eslint-disable-line
  const roles = useSelector((state: RootState) => state.roleReducer.roles);
  const navbarOpen = useSelector(
    (state: RootState) => state.navbarReducer.stateOpen
  );
  const navbarClass = navbarOpen ? "expanded" : "collapsed";
  const [showModal, setShowModal] = useState<boolean>(false);
  const [actions, setActions] = useState<string>("");

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setRoleData({
      nameRole: "",
      descriptionRole: "",
      statusRole: "Inactivo",
      activityId: [],
    });
    setActions("");
    setShowModal(false);
  };

  useEffect(() => {
    dispatch(getAllRoles());
  }, [dispatch]);

  const handleEditAction = (params: any) => {
    setRoleData(params.row);
    setActions("edit");
    openModal();
  };

  // get the active roles
  // get the inactive roles
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
          deleteCategory={deleteCategory}
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
