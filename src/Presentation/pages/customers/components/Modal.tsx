import { FormEvent, useEffect, useState } from "react";
import { CustomerModel } from "../../../../domain/models/CustomerModel";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { Dispatch } from "redux";
import { createCustomer } from "../../../../store/actions/customerActions";

interface IModalCustomersProps {
  onCloseModal?: () => void;
  initialState?: CustomerModel;
  action?: string;
}

export const ModalCustomers = ({
  onCloseModal,
  initialState,
  action,
}: IModalCustomersProps) => {
  const dispatch = useDispatch<Dispatch<any>>(); // eslint-disable-line
  const [customerData, setCustomerData] = useState<CustomerModel>({
    userId: initialState?.userId || 0,
    nameCustomer: initialState?.nameCustomer || "",
    nitCustomer: initialState?.nitCustomer || "",
    addressCustomer: initialState?.addressCustomer || "",
    phoneCustomer: initialState?.phoneCustomer || "",
    statusCustomer: initialState?.statusCustomer || "Inactive",
  });

  const getUser = useSelector((state: RootState) => state.userReducer.user);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    customerData.userId = getUser?.id;
    dispatch(createCustomer(customerData));
    onCloseModal && onCloseModal();
  };

  useEffect(() => {
    console.log("action", action);
  }, [action]);

  return (
    <div>
      <div className="modal">
        <div className="modal-content">
          <div className="modal-header">
            <h4>Agregar un nuevo cliente</h4>
            <span className="close" onClick={onCloseModal}>
              &times;
            </span>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                id="customerName"
                placeholder="Nombre del cliente"
                value={customerData.nameCustomer}
                onChange={(event) =>
                  setCustomerData((prevData) => ({
                    ...prevData,
                    nameCustomer: event.target.value,
                  }))
                }
                required
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                id="customerNit"
                placeholder="Agregar NIT o cédula"
                value={customerData.nitCustomer}
                onChange={(event) =>
                  setCustomerData((prevData) => ({
                    ...prevData,
                    nitCustomer: event.target.value,
                  }))
                }
                required
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                id="customerAddress"
                placeholder="Agregar dirección"
                value={customerData.addressCustomer}
                onChange={(event) =>
                  setCustomerData((prevData) => ({
                    ...prevData,
                    addressCustomer: event.target.value,
                  }))
                }
                required
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                id="customerPhone"
                placeholder="Agregar teléfono"
                value={customerData.phoneCustomer}
                onChange={(event) =>
                  setCustomerData((prevData) => ({
                    ...prevData,
                    phoneCustomer: event.target.value,
                  }))
                }
                required
              />
            </div>
            <div className="form-group">
              <select
                id="customerStatus"
                onChange={(event) =>
                  setCustomerData((prevData) => ({
                    ...prevData,
                    statusCustomer: event.target.value,
                  }))
                }
                required
              >
                <option value="">Selecciona el status del cliente</option>
                <option value="Active">Activo</option>
                <option value="Inactive">Inactivo</option>
              </select>
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
