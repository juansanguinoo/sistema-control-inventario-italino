import { useState, ChangeEvent, FormEvent } from "react";
import {
  createCategory,
  updateCategory,
} from "../../../../store/actions/categoryActions";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { CategoryModel } from "../../../../domain/models/CategoryModel";
import Swal from "sweetalert2";

interface IModalCategoryProps {
  onCloseModal?: () => void;
  initialState?: CategoryModel;
  action?: string;
}

export const ModalCategory = ({
  onCloseModal,
  initialState,
  action,
}: IModalCategoryProps) => {
  const dispatch = useDispatch<Dispatch<any>>(); // eslint-disable-line
  const [categoryData, setCategoryData] = useState<CategoryModel>({
    id: initialState?.id || 0,
    nameCategory: initialState?.nameCategory || "",
    referenceCategory: initialState?.referenceCategory || "",
    statusCategory: initialState?.statusCategory || "Inactivo",
    descriptionCategory: initialState?.descriptionCategory || "",
  });

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    setCategoryData((prevData: CategoryModel) => ({
      ...prevData,
      statusCategory: checked ? "Activo" : "Inactivo",
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      categoryData.nameCategory === "" ||
      categoryData.referenceCategory === "" ||
      categoryData.descriptionCategory === ""
    ) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Por favor completa todos los campos",
      });
    } else {
      if (action === "edit") {
        dispatch(updateCategory(categoryData.id!, categoryData));
      } else {
        dispatch(createCategory(categoryData));
      }
      Swal.fire("Buen trabajo!", "Categoría creada correctamente!", "success");
      onCloseModal && onCloseModal();
    }
  };

  return (
    <div>
      <div className="modal-category">
        <div className="modal-category-content">
          <div className="modal-category-header">
            <h4>Agregar Categoría</h4>
            <span className="close" onClick={onCloseModal}>
              &times;
            </span>
          </div>
          <p className="form-modal-detail-category">Detalles de la categoría</p>
          <form className="form-modal-category" onSubmit={handleSubmit}>
            <div className="form-group-category">
              <input
                type="text"
                id="categoryName"
                placeholder="Nombre de la categoría"
                value={categoryData.nameCategory}
                onChange={(event) =>
                  setCategoryData((prevData) => ({
                    ...prevData,
                    nameCategory: event.target.value,
                  }))
                }
              />
            </div>
            <div className="form-group-category">
              <input
                type="text"
                id="categoryReference"
                placeholder="Referencia de la categoría"
                value={categoryData.referenceCategory}
                onChange={(event) =>
                  setCategoryData((prevData) => ({
                    ...prevData,
                    referenceCategory: event.target.value,
                  }))
                }
              />
            </div>
            <div className="form-group-category">
              <textarea
                name="categoryDescription"
                id="categoryDescription"
                placeholder="Descripción de la categoría"
                value={categoryData.descriptionCategory}
                onChange={(event) =>
                  setCategoryData((prevData) => ({
                    ...prevData,
                    descriptionCategory: event.target.value,
                  }))
                }
              ></textarea>
            </div>
            <div className="form-group">
              <label
                className="modal-label-category-status"
                htmlFor="btn-switch-active-category"
              >
                Status de la categoría:
              </label>
              <input
                type="checkbox"
                id="btn-switch-active-category"
                checked={categoryData.statusCategory === "Activo"}
                onChange={handleCheckboxChange}
              />
              <label
                htmlFor="btn-switch-active-category"
                className="lbl-switch-active-category"
              ></label>
            </div>
            <div className="modal-category-footer">
              <button
                type="button"
                className="category-cancel-button"
                onClick={onCloseModal}
              >
                Cancelar
              </button>
              {action === "preview" ? null : (
                <button type="submit" className="category-add-button">
                  {action === "edit" ? "Guardar cambios" : "Agregar"}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
