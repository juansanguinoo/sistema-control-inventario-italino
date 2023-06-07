import "./styles.css";
import LoginImg from "../../assets/Login.svg";

export const Login = () => {
  return (
    <div className="body">
      <div className="login-container">
        <div className="login-left">
          <div className="login-header">
            <h1>Bienvenido a nuestra aplicación</h1>
            <p>Por favor inicia sesión</p>
          </div>
          <form className="login-form">
            <div className="login-form-content">
              <div className="form-item">
                <label htmlFor="email">Ingrese su correo electronico</label>
                <input type="text" id="email" />
              </div>
              <div className="form-item">
                <label htmlFor="password">Ingrese su contraseña</label>
                <input type="password" id="password" />
              </div>
              <button type="submit" className="form-login-button">
                Iniciar sesión
              </button>
            </div>
            <div className="login-form-footer"></div>
          </form>
        </div>
        <div className="login-right">
          <img src={LoginImg} alt="" />
        </div>
      </div>
    </div>
  );
};
