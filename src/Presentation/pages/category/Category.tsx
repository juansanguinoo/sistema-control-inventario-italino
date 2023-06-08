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
import { CategoryModel } from "../../../domain/models/CategoryModel";

export const Category = () => {
  const [categoryData, setCategoryData] = useState<CategoryModel>({
    nameCategory: "",
    referenceCategory: "",
    statusCategory: "Inactive",
    descriptionCategory: "",
  });
  const [showModal, setShowModal] = useState<boolean>(false);
  const [actions, setActions] = useState<string>("");

  const dispatch = useDispatch<Dispatch<any>>(); // eslint-disable-line
  const categories = useSelector(
    (state: RootState) => state.categoryReducer.categories
  );
  const navbarOpen = useSelector(
    (state: RootState) => state.navbarReducer.stateOpen
  );
  const navbarClass = navbarOpen ? "expanded" : "collapsed";

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const handleEditAction = (params: any) => {
    setCategoryData(params.row);
    setActions("edit");
    openModal();
  };

  const handlePreviewAction = (params: any) => {
    setCategoryData(params.row);
    setActions("preview");
    openModal();
  };

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
          handleEditAction={handleEditAction}
          handlePreviewAction={handlePreviewAction}
        />
        {showModal && (
          <ModalCategory
            onCloseModal={closeModal}
            initialState={categoryData}
            action={actions}
          />
        )}
      </div>
    </div>
  );
};
