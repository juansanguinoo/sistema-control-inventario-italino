import { FormEvent, useState } from "react";
import "./styles.css";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { resetPassword } from "../../../store/actions/userAction";
import { useNavigate } from "react-router-dom";

export const ResetPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<Dispatch<any>>(); // eslint-disable-line
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
  const params = window.location.pathname.split("/");

  const token = params[params.length - 1];

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newPassword === "" || newPasswordConfirm === "") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Por favor completa todos los campos",
      });
    } else if (newPassword !== newPasswordConfirm) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Las contraseñas no coinciden",
      });
    } else if (newPassword === newPasswordConfirm) {
      const originalToken = token.replace(/%20/g, ".");
      dispatch(resetPassword(originalToken, newPassword));
      Swal.fire(
        "Buen trabajo!",
        "Contraseña actualizada correctamente!",
        "success"
      );
      const url = "/reset-password/login";
      const newUrl = url.replace("/reset-password", "");
      navigate(newUrl);
    }
  };

  return (
    <div className="reset-password">
      <div className="reset-password-container">
        <div className="reset-password-title">
          <h1>Restablece tu contraseña</h1>
        </div>
        <div className="reset-password-form">
          <form onSubmit={handleSubmit}>
            <div className="form-reset-password">
              <label htmlFor="reset-password">Crea una nueva contraseña</label>
              <input
                type="password"
                name="reset-password"
                id="reset-password"
                placeholder="Ingresa tu nueva contraseña"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div className="form-reset-password">
              <label htmlFor="reset-password-confirm">
                Confirma tu nueva contraseña
              </label>
              <input
                type="password"
                name="reset-password-confirm"
                id="reset-password-confirm"
                placeholder="Confirma tu nueva contraseña"
                value={newPasswordConfirm}
                onChange={(e) => setNewPasswordConfirm(e.target.value)}
              />
            </div>
            <div className="form-reset-password">
              <button type="submit">Restablecer contraseña</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
