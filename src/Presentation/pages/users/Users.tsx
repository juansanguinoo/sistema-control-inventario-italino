import "./styles.css";
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

  return (
    <div className={`category-container ${navbarClass}`}>
      <div className="category-header">
        <PageTitle title="Usuarios" />
        <HeaderButton
          title="Crear un nuevo usuario"
          handleFunction={openModal}
        />
      </div>
      <div className="category-main">
        <CardInformation />
        <CardInformation />
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
