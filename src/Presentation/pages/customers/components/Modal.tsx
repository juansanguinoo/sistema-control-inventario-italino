import "../styles.css";
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

  return (
    <div>
      <div className="modal-customers">
        <div className="modal-customers-content">
          <div className="modal-customers-header">
            <h4>Agregar un nuevo cliente</h4>
            <span className="close" onClick={onCloseModal}>
              &times;
            </span>
          </div>
          <p className="form-modal-detail-customers">Detalles del cliente</p>
          <form className="form-modal-customers" onSubmit={handleSubmit}>
            <div className="form-group-customers">
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
            <div className="form-group-customers">
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
            <div className="form-group-customers">
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
            <div className="phone-form-group">
              <div className="phone-form-group-customers">
                <select name="" id="">
                  <option value="">+57</option>
                  <option value="">+58</option>
                  <option value="">+59</option>
                </select>
              </div>
              <div className="phone-form-group-customers">
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
            </div>
            <div className="form-group-customers">
              <label
                className="form-modal-label-customers"
                htmlFor="customerStatus"
              >
                Estado del cliente
              </label>
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
                <option value="Active">Activo</option>
                <option value="Inactive">Inactivo</option>
              </select>
            </div>
            <div className="modal-customers-footer">
              <button
                type="button"
                className="cancel-button-customers"
                onClick={onCloseModal}
              >
                Cancelar
              </button>

              {action === "preview" ? null : (
                <button type="submit" className="add-button-customers">
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
