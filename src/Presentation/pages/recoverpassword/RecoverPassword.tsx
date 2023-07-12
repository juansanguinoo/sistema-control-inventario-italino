import { Link } from "react-router-dom";
import "./styles.css";
import { Dispatch } from "redux";
import Swal from "sweetalert2";
import { forgotPassword } from "../../../store/actions/userAction";
import { useDispatch } from "react-redux";
import { useState, FormEvent } from "react";

export const RecoverPassword = () => {
  const dispatch = useDispatch<Dispatch<any>>(); // eslint-disable-line
  const [email, setEmail] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email === "") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Por favor completa todos los campos",
      });
    } else if (email !== "") {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      const isValidEmail = emailRegex.test(email);
      if (!isValidEmail) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Por favor ingresa un correo válido",
        });
      } else {
        dispatch(forgotPassword(email));
        Swal.fire(
          "Buen trabajo!",
          "Hemos enviado un enlace a tu correo con el cual podrás actualizar tu contraseña!",
          "success"
        );
      }
    }
  };

  return (
    <div className="recover-password">
      <div className="recover-password-container">
        <h2>Recuperar tu contraseña</h2>
        <p>Para recuperar tu contraseña, digita tu email</p>
        <div className="recover-form-container">
          <form onSubmit={handleSubmit}>
            <div className="form-item-recover">
              <label htmlFor="email">Ingrese su correo electrónico</label>
              <input
                type="text"
                id="email"
                className="recover-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button type="submit" className="recover-button">
              Recuperar contraseña
            </button>
            <div className="go-to-login">
              <p>
                <Link to="/login">Volver al inicio de sesión</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
