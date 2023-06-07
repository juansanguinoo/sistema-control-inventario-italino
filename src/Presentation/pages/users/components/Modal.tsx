import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { UserModel } from "../../../../domain/models/UserModel";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { getAllRoles } from "../../../../store/actions/roleActions";
import { Dispatch } from "redux";
import { createUser } from "../../../../store/actions/userAction";

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
    nameUser: initialState?.nameUser || "",
    phoneUser: initialState?.phoneUser || "",
    emailUser: initialState?.emailUser || "",
    passwordUser: initialState?.passwordUser || "",
    statusUser: initialState?.statusUser || "Inactive",
    roleId: initialState?.roleId || 0,
  });

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    setUserData((prevData: UserModel) => ({
      ...prevData,
      statusUser: checked ? "Active" : "Inactive",
    }));
  };
  const roles = useSelector((state: RootState) => state.roleReducer.roles);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(createUser(userData));
    onCloseModal && onCloseModal();
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
      <div className="modal">
        <div className="modal-content">
          <div className="modal-header">
            <h4>Crear Usuario</h4>
            <span className="close" onClick={onCloseModal}>
              &times;
            </span>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="userName">Nombre del usuario:</label>
              <input
                type="text"
                id="userName"
                name="nameUser"
                required
                value={userData.nameUser}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="userPhone">Teléfono del usuario:</label>
              <div className="phone-input">
                <input
                  type="text"
                  id="userPhone"
                  name="phoneUser"
                  required
                  value={userData.phoneUser}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="userEmail">Correo electrónico:</label>
              <input
                type="email"
                id="userEmail"
                name="emailUser"
                required
                value={userData.emailUser}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="userPassword">Contraseña:</label>
              <input
                type="password"
                id="userPassword"
                name="passwordUser"
                required
                value={userData.passwordUser}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group select-container">
              <label htmlFor="userRole">Rol del usuario:</label>
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
              <label htmlFor="btn-switch-active-category">
                Status del usuario:
              </label>
              <input
                type="checkbox"
                id="btn-switch-active-category"
                checked={userData.statusUser === "Active"}
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
              {action === "watch" ? null : (
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
