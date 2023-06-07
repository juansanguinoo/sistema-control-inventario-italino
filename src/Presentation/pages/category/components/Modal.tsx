import { useState, ChangeEvent, FormEvent } from "react";
import { createCategory } from "../../../../store/actions/categoryActions";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { CategoryModel } from "../../../../domain/models/CategoryModel";

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
    nameCategory: initialState?.nameCategory || "",
    referenceCategory: initialState?.referenceCategory || "",
    statusCategory: initialState?.statusCategory || "Inactive",
    descriptionCategory: initialState?.descriptionCategory || "",
  });

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    setCategoryData((prevData: CategoryModel) => ({
      ...prevData,
      statusCategory: checked ? "Active" : "Inactive",
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(createCategory(categoryData));
    onCloseModal && onCloseModal();
  };

  return (
    <div>
      <div className="modal">
        <div className="modal-content">
          <div className="modal-header">
            <h4>Agregar Categoría</h4>
            <span className="close" onClick={onCloseModal}>
              &times;
            </span>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="categoryName">Nombre de la categoría:</label>
              <input
                type="text"
                id="categoryName"
                required
                value={categoryData.nameCategory}
                onChange={(event) =>
                  setCategoryData((prevData) => ({
                    ...prevData,
                    nameCategory: event.target.value,
                  }))
                }
              />
            </div>
            <div className="form-group">
              <label htmlFor="categoryReference">
                Referencia de la categoría:
              </label>
              <input
                type="text"
                id="categoryReference"
                required
                value={categoryData.referenceCategory}
                onChange={(event) =>
                  setCategoryData((prevData) => ({
                    ...prevData,
                    referenceCategory: event.target.value,
                  }))
                }
              />
            </div>
            <div className="form-group">
              <label htmlFor="categoryReference">
                Descripción de la categoría:
              </label>
              <textarea
                name=""
                id=""
                required
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
              <label htmlFor="btn-switch-active-category">
                Status de la categoría:
              </label>
              <input
                type="checkbox"
                id="btn-switch-active-category"
                checked={categoryData.statusCategory === "Active"}
                onChange={handleCheckboxChange}
              />
              <label
                htmlFor="btn-switch-active-category"
                className="lbl-switch-active-category"
              ></label>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="cancel-button"
                onClick={onCloseModal}
              >
                Cancelar
              </button>
              {action === "preview" ? null : (
                <button type="submit" className="add-button">
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
