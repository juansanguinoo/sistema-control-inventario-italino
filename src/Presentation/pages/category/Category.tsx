import "./styles.css";
import { ModalCategory } from "./components/Modal";
import { PageTitle } from "../../components/titles/PageTitle";
import { HeaderButton } from "../../components/buttons/HeaderButton";
import { CardInformation } from "../../components/cards/CardInformation";
import { TableInformation } from "../../components/tables/TableInformation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { useState, useEffect } from "react";
import {
  getCategories,
  deleteCategory,
} from "../../../store/actions/categoryActions";
import { Dispatch } from "redux";
import { categoryColumns } from "../../utils/columnsDataTable";

export const Category = () => {
  const dispatch = useDispatch<Dispatch<any>>(); // eslint-disable-line
  const categories = useSelector(
    (state: RootState) => state.categoryReducer.categories
  );
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
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <div className={`category-container ${navbarClass}`}>
      <div className="category-header">
        <PageTitle title="Categorías" />
        <HeaderButton
          title="Crear una nueva categoría"
          handleFunction={openModal}
        />
      </div>
      <div className="category-main">
        <CardInformation />
        <CardInformation />
        <TableInformation
          categories={categories}
          columns={categoryColumns}
          deleteCategory={deleteCategory}
        />
        {showModal && <ModalCategory onCloseModal={closeModal} />}
      </div>
    </div>
  );
};
