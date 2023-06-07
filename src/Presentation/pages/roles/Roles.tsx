import "./styles.css";
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

export const Roles = () => {
  const dispatch = useDispatch<Dispatch<any>>(); // eslint-disable-line
  const roles = useSelector((state: RootState) => state.roleReducer.roles);
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
    dispatch(getAllRoles());
  }, [dispatch]);

  return (
    <div className={`category-container ${navbarClass}`}>
      <div className="category-header">
        <PageTitle title="Roles de usuarios" />
        <HeaderButton title="Crear un nuevo rol" handleFunction={openModal} />
      </div>
      <div className="category-main">
        <CardInformation />
        <CardInformation />
        <TableInformation
          categories={roles}
          columns={roleColumns}
          deleteCategory={deleteCategory}
          showView={false}
        />
        {showModal && <ModalRoles onCloseModal={closeModal} />}
      </div>
    </div>
  );
};
