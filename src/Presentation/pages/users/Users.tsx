import "./styles.css";
import Folder from "../../assets/Folder.svg";
import { useDispatch, useSelector } from "react-redux";
import { PageTitle } from "../../components/titles/PageTitle";
import { RootState } from "../../../store/store";
import { HeaderButton } from "../../components/buttons/HeaderButton";
import { CardInformation } from "../../components/cards/CardInformation";
import { TableInformation } from "../../components/tables/TableInformation";
import { Dispatch } from "redux";
import { useEffect, useState } from "react";
import { deleteCategory } from "../../../store/actions/categoryActions";
import { userColumns } from "../../utils/columnsDataTable";
import { getAllUsers } from "../../../store/actions/userAction";
import { ModalUsers } from "./components/Modal";

export const Users = () => {
  const dispatch = useDispatch<Dispatch<any>>(); // eslint-disable-line
  const users = useSelector((state: RootState) => state.userReducer.users);
  const navbarOpen = useSelector(
    (state: RootState) => state.navbarReducer.stateOpen
  );
  const navbarClass = navbarOpen ? "expanded" : "collapsed";
  const [showModal, setShowModal] = useState<boolean>(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  // get the active users
  const activeUsers = users.filter((user) => user.statusUser === "Active");

  // get the inactive users
  const inactiveUsers = users.filter((user) => user.statusUser === "Inactive");

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
          icon={Folder}
          titles={["Total de usuarios"]}
          data={[users.length]}
        />
        <CardInformation
          icon={Folder}
          titles={["Usuarios activos", "Usuarios inactivos"]}
          data={[activeUsers.length, inactiveUsers.length]}
        />
        <TableInformation
          categories={users}
          columns={userColumns}
          deleteCategory={deleteCategory}
        />
        {showModal && <ModalUsers onCloseModal={closeModal} />}
      </div>
    </div>
  );
};
