import { useDispatch, useSelector } from "react-redux";
import { PageTitle } from "../../components/titles/PageTitle";
import "./styles.css";
import { RootState } from "../../../store/store";
import User from "../../assets/Profile.svg";
import Rol from "../../assets/Edit.svg";
import Email from "../../assets/email.svg";
import Phone from "../../assets/phone.svg";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Lock from "../../assets/lock.svg";
import { HeaderButton } from "../../components/buttons/HeaderButton";
import Swal from "sweetalert2";
import { Dispatch } from "redux";
import { updateUser, updatePassword } from "../../../store/actions/userAction";

export const UserInfo = () => {
  const dispatch = useDispatch<Dispatch<any>>(); // eslint-disable-line
  const [isClick, setIsClick] = useState<boolean>(false);
  const user = useSelector((state: RootState) => state.userReducer.user);
  const [userData, setUserData] = useState({
    id: user?.id || 0,
    nameUser: user?.nameUser || "",
    phoneUser: user?.phoneUser || "",
    emailUser: user?.emailUser || "",
    statusUser: user?.statusUser || "Inactivo",
    passwordUser: user?.passwordUser || "",
  });

  const [passwordUser, setPasswordUser] = useState({
    actualPassword: "",
    newPassword: "",
  });

  const navbarOpen = useSelector(
    (state: RootState) => state.navbarReducer.stateOpen
  );

  const navbarClass = navbarOpen ? "expanded" : "collapsed";

  const handleUpdate = () => {
    setIsClick(!isClick);
  };

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    setUserData((prevData: any) => ({
      ...prevData,
      statusUser: checked ? "Activo" : "Inactivo",
    }));
  };

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
        dispatch(updateUser(userData.id!, userData));
        Swal.fire(
          "Buen trabajo!",
          "Usuario actualizado correctamente!",
          "success"
        );
      }
    }
  };

  const handlePasswordSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (passwordUser.actualPassword === "" || passwordUser.newPassword === "") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Por favor completa todos los campos",
      });
    } else if (passwordUser.actualPassword === passwordUser.newPassword) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "La nueva contraseña no puede ser igual a la actual",
      });
    } else if (
      passwordUser.actualPassword !== "" &&
      passwordUser.newPassword !== "" &&
      passwordUser.actualPassword !== passwordUser.newPassword
    ) {
      dispatch(
        updatePassword(
          userData.id!,
          passwordUser.actualPassword,
          passwordUser.newPassword
        )
      );
      Swal.fire(
        "Buen trabajo!",
        "Contraseña actualizada correctamente!",
        "success"
      );
    }
  };

  return (
    <div className={`user-info-container ${navbarClass}`}>
      <div className="user-info-header">
        <PageTitle title="Datos del usuario" />
        <HeaderButton
          title={
            isClick ? "Cancelar actualización" : "Actualizar datos del usuario"
          }
          handleFunction={handleUpdate}
        />
      </div>
      <div className="user-info-main">
        <div className="info-container">
          <form className="form-user-info" onSubmit={handleSubmit}>
            <div className="form-info">
              <label htmlFor="userInfoName">Nombre del usuario</label>
              <div className="form-info-container">
                <img src={User} alt="user-icon" />
                <input
                  type="text"
                  id="userInfoName"
                  value={isClick ? userData.nameUser : user?.nameUser}
                  onChange={(event) =>
                    setUserData((prevData) => ({
                      ...prevData,
                      nameUser: event.target.value,
                    }))
                  }
                  readOnly={!isClick}
                />
              </div>
            </div>
            <div className="form-info">
              <label htmlFor="userInfoEmail">Correo electrónico</label>
              <div className="form-info-container">
                <img src={Email} alt="" />
                <input
                  type="text"
                  id="userInfoEmail"
                  value={isClick ? userData.emailUser : user?.emailUser}
                  onChange={(event) =>
                    setUserData((prevData) => ({
                      ...prevData,
                      emailUser: event.target.value,
                    }))
                  }
                  readOnly={!isClick}
                />
              </div>
            </div>
            <div className="form-info">
              <label htmlFor="userInfoPhone">Número de teléfono</label>
              <div className="phone-info-container">
                <div className="phone-info">
                  <img src={Phone} alt="" />
                </div>
                <input
                  type="text"
                  id="userInfoPhone"
                  value={isClick ? userData.phoneUser : user?.phoneUser}
                  onChange={(event) =>
                    setUserData((prevData) => ({
                      ...prevData,
                      phoneUser: event.target.value,
                    }))
                  }
                  readOnly={!isClick}
                />
              </div>
            </div>
            <div className="form-info">
              <div className="form-info">
                <label htmlFor="userInfoRol">Rol del usuario</label>
                <div className="form-info-container">
                  <img src={Rol} alt="" />
                  <input
                    type="text"
                    id="userInfoRol"
                    value={user?.roleId.name_role}
                    readOnly
                  />
                </div>
              </div>
            </div>
            <div className="form-info">
              <label htmlFor="btn-switch-user">Estatus del usuario</label>
              <input
                type="checkbox"
                id="btn-switch-user"
                checked={
                  isClick
                    ? userData.statusUser === "Activo"
                    : false || user?.statusUser === "Activo"
                }
                onChange={handleCheckboxChange}
                readOnly={!isClick}
              />
              <label
                htmlFor="btn-switch-user"
                className="lbl-switch-user"
              ></label>
            </div>
            {isClick ? (
              <div className="form-submit-button">
                <button type="submit">Guardar cambios</button>
              </div>
            ) : null}
          </form>
        </div>

        <div className="info-container">
          <h4>Actualizar contraseña</h4>
          <form onSubmit={handlePasswordSubmit}>
            <div className="form-info">
              <label htmlFor="userInfoPassword">Contraseña actual</label>
              <div className="form-info-container">
                <img src={Lock} alt="" />
                <input
                  type="password"
                  id="userInfoPassword"
                  value={passwordUser.actualPassword}
                  onChange={(event) =>
                    setPasswordUser((prevData) => ({
                      ...prevData,
                      actualPassword: event.target.value,
                    }))
                  }
                  readOnly={!isClick}
                />
              </div>
            </div>
            <div className="form-info">
              <label htmlFor="userInfoNewPassword">Nueva contraseña</label>
              <div className="form-info-container">
                <img src={Lock} alt="" />
                <input
                  type="password"
                  id="userInfoNewPassword"
                  value={passwordUser.newPassword}
                  onChange={(event) =>
                    setPasswordUser((prevData) => ({
                      ...prevData,
                      newPassword: event.target.value,
                    }))
                  }
                  readOnly={!isClick}
                />
              </div>
            </div>
            {isClick ? (
              <div className="password-submit-button">
                <button type="submit">Actualizar contraseña</button>
              </div>
            ) : null}
          </form>
        </div>

        <div className="info-container">
          <h4>Avatar</h4>
        </div>
      </div>
    </div>
  );
};
