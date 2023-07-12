import "../styles.css";
import { FormEvent, useState } from "react";
import { CustomerModel } from "../../../../domain/models/CustomerModel";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import {
  createCustomer,
  updateCustomer,
} from "../../../../store/actions/customerActions";
import Swal from "sweetalert2";
import { useGetUser } from "../../../hooks/useGetUser";

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
  const { getUser } = useGetUser();
  const [customerData, setCustomerData] = useState<CustomerModel>({
    id: initialState?.id || 0,
    userId: initialState?.userId || 0,
    nameCustomer: initialState?.nameCustomer || "",
    nitCustomer: initialState?.nitCustomer || "",
    emailCustomer: initialState?.emailCustomer || "",
    addressCustomer: initialState?.addressCustomer || "",
    phoneCustomer: initialState?.phoneCustomer || "",
    statusCustomer: initialState?.statusCustomer || "Activo",
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      customerData.userId === undefined ||
      customerData.nameCustomer === "" ||
      customerData.nitCustomer === "" ||
      customerData.emailCustomer === "" ||
      customerData.addressCustomer === "" ||
      customerData.phoneCustomer === "" ||
      customerData.statusCustomer === ""
    ) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Por favor completa todos los campos",
      });
    } else if (customerData.emailCustomer !== "") {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      const isValidEmail = emailRegex.test(customerData.emailCustomer);
      if (!isValidEmail) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Por favor ingresa un correo válido",
        });
      } else {
        if (action === "edit") {
          dispatch(updateCustomer(customerData.id!, customerData));
        } else {
          dispatch(createCustomer({ ...customerData, userId: getUser?.id }));
        }
        Swal.fire("Buen trabajo!", "Cliente creado correctamente!", "success");
        onCloseModal && onCloseModal();
      }
    }
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
              />
            </div>
            <div className="form-group-customers">
              <input
                type="text"
                id="customerEmail"
                placeholder="Agregar correo electrónico"
                value={customerData.emailCustomer}
                onChange={(event) =>
                  setCustomerData((prevData) => ({
                    ...prevData,
                    emailCustomer: event.target.value,
                  }))
                }
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
                value={customerData.statusCustomer}
                onChange={(event) =>
                  setCustomerData((prevData) => ({
                    ...prevData,
                    statusCustomer: event.target.value,
                  }))
                }
              >
                <option value="Activo">Activo</option>
                <option value="Inactivo">Inactivo</option>
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
