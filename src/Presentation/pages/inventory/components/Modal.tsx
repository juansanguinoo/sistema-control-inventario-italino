import { useState } from "react";
import { AddInventoryRequest } from "../../../../domain/models/AddInventoryRequest";
import { InventoryModel } from "../../../../domain/models/InventoryModel";
import { useGetCustomerByUser } from "../../../hooks/useGetCustomerByUser";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { addInventory } from "../../../../store/actions/inventoryActions";
import Swal from "sweetalert2";

interface IModalInventoryProps {
  onCloseModal?: () => void;
  inventoryData: InventoryModel;
}

export const ModalInventory = ({
  onCloseModal,
  inventoryData,
}: IModalInventoryProps) => {
  const dispatch = useDispatch<Dispatch<any>>(); // eslint-disable-line
  const { getUser } = useGetCustomerByUser();
  const [sendData, setSendData] = useState<AddInventoryRequest>({
    inventoryId: inventoryData.id!,
    userId: getUser?.id!,
    quantity: 0,
    detail: "",
    type: "Entrada",
  });

  const handleSubmit = (event: any) => {
    event.preventDefault();
    // dispatch(addInventory(sendData));
    if (sendData.quantity !== 0 && sendData.detail !== "") {
      dispatch(addInventory(sendData));
      Swal.fire(
        "¡Buen trabajo!",
        "¡Producto actualizado con éxito!",
        "success"
      );
      onCloseModal && onCloseModal();
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "¡Debes llenar todos los campos!",
      });
    }
  };

  return (
    <div>
      <div className="modal-category">
        <div className="modal-category-content">
          <div className="modal-category-header">
            <h4>Editar stock del producto</h4>
            <span className="close" onClick={onCloseModal}>
              &times;
            </span>
          </div>
          <form className="form-modal-category" onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-modal-label-detail" htmlFor="date">
                Tipo de movimiento
              </label>
              <div className="datetime-container">
                <select
                  name="paymentOrder"
                  id="paymentType"
                  className="modal-orders-client-select"
                  value={sendData.type}
                  onChange={(event) =>
                    setSendData((prevData) => ({
                      ...prevData,
                      type: event.target.value,
                    }))
                  }
                >
                  <option value="Entrada">Entrada</option>
                  <option value="Salida">Salida</option>
                </select>
                <input
                  type="number"
                  id="orderType"
                  className="modal-orders-client-select"
                  placeholder="cantidad"
                  value={sendData.quantity || ""}
                  onChange={(event) =>
                    setSendData((prevData) => ({
                      ...prevData,
                      quantity: parseInt(event.target.value) || 0,
                    }))
                  }
                />
              </div>
            </div>
            <div className="form-group-category">
              <textarea
                name="categoryDescription"
                id="categoryDescription"
                placeholder="Detalles del movimiento"
                value={sendData.detail}
                onChange={(event) =>
                  setSendData((prevData) => ({
                    ...prevData,
                    detail: event.target.value,
                  }))
                }
              ></textarea>
            </div>
            <div className="modal-category-footer">
              <button
                type="button"
                className="category-cancel-button"
                onClick={onCloseModal}
              >
                Cancelar
              </button>
              <button type="submit" className="category-add-button">
                Guardar cambios
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
