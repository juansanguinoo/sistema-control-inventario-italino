import "./styles.css";
import Bookmark from "../../assets/Bookmark.svg";
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
  updateCategory,
} from "../../../store/actions/categoryActions";
import { Dispatch } from "redux";
import { categoryColumns } from "../../utils/columnsDataTable";
import { CategoryModel } from "../../../domain/models/CategoryModel";
import Swal from "sweetalert2";

export const Category = () => {
  const [categoryData, setCategoryData] = useState<CategoryModel>({
    id: 0,
    nameCategory: "",
    referenceCategory: "",
    statusCategory: "Inactive",
    descriptionCategory: "",
  });
  const [showModal, setShowModal] = useState<boolean>(false);
  const [actions, setActions] = useState<string>("");
  const [deleteAction, setDeleteAction] = useState<boolean>(false);

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
    setCategoryData({
      id: 0,
      nameCategory: "",
      referenceCategory: "",
      statusCategory: "Inactivo",
      descriptionCategory: "",
    });
    setActions("");
    setShowModal(false);
  };

  useEffect(() => {
    dispatch(getCategories());
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
          dispatch(updateCategory(categoryData.id!, categoryData));
          setDeleteAction(false);
        }
      });
    }
  }, [deleteAction, dispatch, categoryData]);

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

  const handleDeleteAction = (params: any) => {
    setCategoryData({ ...params.row, statusCategory: "Inactivo" });
    setDeleteAction(true);
  };

  // get the active categories
  const activeCategories = categories.filter(
    (category) => category.statusCategory == "Activo"
  );

  // get the inactive categories
  const inactiveCategories = categories.filter(
    (category) => category.statusCategory == "Inactivo"
  );

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
        <CardInformation
          icon={Bookmark}
          titles={["Total de categorías"]}
          data={[categories.length]}
        />
        <CardInformation
          icon={Bookmark}
          titles={["Categorías activas", "Categorías inactivas"]}
          data={[activeCategories.length, inactiveCategories.length]}
        />
        <TableInformation
          categories={categories}
          columns={categoryColumns}
          deleteCategory={handleDeleteAction}
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
