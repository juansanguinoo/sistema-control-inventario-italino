import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { UserModel } from "../../../../domain/models/UserModel";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { getAllRoles } from "../../../../store/actions/roleActions";
import { Dispatch } from "redux";
import { createUser, updateUser } from "../../../../store/actions/userAction";
import Swal from "sweetalert2";

interface IModalUserProps {
  onCloseModal?: () => void;
  initialState?: UserModel;
  action?: string;
}

export const ModalUsers = ({
  onCloseModal,
  initialState,
  action,
}: IModalUserProps) => {
  const dispatch = useDispatch<Dispatch<any>>(); // eslint-disable-line
  const [userData, setUserData] = useState<UserModel>({
    id: initialState?.id || 0,
    nameUser: initialState?.nameUser || "",
    phoneUser: initialState?.phoneUser || "",
    emailUser: initialState?.emailUser || "",
    passwordUser: initialState?.passwordUser || "",
    statusUser: initialState?.statusUser || "Inactivo",
    roleId: initialState?.roleId || 0,
  });

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    setUserData((prevData: UserModel) => ({
      ...prevData,
      statusUser: checked ? "Activo" : "Inactivo",
    }));
  };
  const roles = useSelector((state: RootState) => state.roleReducer.roles);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      userData.nameUser === "" ||
      userData.phoneUser === "" ||
      userData.emailUser === ""
    ) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Por favor completa todos los campos",
      });
    } else if (userData.roleId === 0) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Por favor selecciona un rol",
      });
    } else if (userData.emailUser !== "") {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      const isValidEmail = emailRegex.test(userData.emailUser);
      if (!isValidEmail) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Por favor ingresa un correo válido",
        });
      } else {
        if (action === "edit") {
          dispatch(updateUser(userData.id!, userData));
        } else {
          dispatch(createUser(userData));
        }
        Swal.fire("Buen trabajo!", "Usuario creado correctamente!", "success");
        onCloseModal && onCloseModal();
      }
    }
  };

  useEffect(() => {
    dispatch(getAllRoles());
  }, [dispatch]);

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setUserData((prevData: UserModel) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setUserData((prevData: UserModel) => ({
      ...prevData,
      [name]: Number(value),
    }));
  };

  return (
    <div>
      <div className="modal-user">
        <div className="modal-user-content">
          <div className="modal-user-header">
            <h4>Crear Usuario</h4>
            <span className="close" onClick={onCloseModal}>
              &times;
            </span>
          </div>
          <p className="form-modal-detail-user">Detalles del usuario</p>
          <form className="form-modal-user" onSubmit={handleSubmit}>
            <div className="form-group-user">
              <input
                type="text"
                id="userName"
                name="nameUser"
                placeholder="Nombre del usuario"
                value={userData.nameUser}
                onChange={handleInputChange}
              />
            </div>
            <div className="phone-form-group-user">
              <div className="phone-select-user">
                <select name="" id="">
                  <option value="">+57</option>
                  <option value="">+58</option>
                  <option value="">+59</option>
                </select>
              </div>
              <div className="phone-select-user">
                <input
                  type="text"
                  id="userPhone"
                  name="phoneUser"
                  placeholder="Teléfono del usuario"
                  value={userData.phoneUser}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="form-group-user">
              <input
                type="text"
                id="userEmail"
                name="emailUser"
                placeholder="Correo electrónico del usuario"
                value={userData.emailUser}
                onChange={handleInputChange}
                readOnly={action === "edit"}
              />
            </div>
            {action !== "edit" && action !== "preview" && (
              <div className="form-group-user">
                <input
                  type="password"
                  id="userPassword"
                  name="passwordUser"
                  placeholder="Contraseña del usuario"
                  value={userData.passwordUser}
                  onChange={handleInputChange}
                />
              </div>
            )}
            <div className="form-group-user">
              <label className="form-modal-user-label-rol" htmlFor="userRole">
                Rol del usuario:
              </label>
              <select
                id="userRole"
                name="roleId"
                value={userData.roleId}
                onChange={handleSelectChange}
              >
                <option value="">Seleccionar rol</option>
                {roles.map((role: any) => (
                  <option key={role.id} value={Number(role.id)}>
                    {role.nameRole}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label
                className="form-modal-user-label-status"
                htmlFor="btn-switch-active-user"
              >
                Status del usuario:
              </label>
              <input
                type="checkbox"
                id="btn-switch-active-user"
                checked={userData.statusUser === "Activo"}
                onChange={handleCheckboxChange}
              />
              <label
                htmlFor="btn-switch-active-user"
                className="lbl-switch-active-user"
              ></label>
            </div>
            <div className="modal-user-footer">
              <button
                type="button"
                className="cancel-user-button"
                onClick={onCloseModal}
              >
                Cancelar
              </button>
              {action === "preview" ? null : (
                <button type="submit" className="add-user-button">
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
