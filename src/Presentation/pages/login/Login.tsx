import "./styles.css";
import LoginImg from "../../assets/Login.svg";
import { useEffect, useState } from "react";

export const Login = () => {
  const [smallScreen, setSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 350) {
        setSmallScreen(true);
      } else {
        setSmallScreen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="login">
      <div className="login-container">
        <div className="login-left">
          <div className="login-header">
            <h1>Bienvenido a nuestra aplicación</h1>
            <p>Por favor inicia sesión</p>
          </div>
          <form className="login-form">
            <div className="login-form-content">
              <div className="form-item">
                {smallScreen ? (
                  <input
                    type="text"
                    id="email"
                    className="login-email"
                    placeholder="Correo electrónico"
                  />
                ) : (
                  <>
                    <label htmlFor="email">Ingrese su correo electronico</label>
                    <input type="text" id="email" className="login-email" />
                  </>
                )}
              </div>
              <div className="form-item">
                {smallScreen ? (
                  <input
                    type="password"
                    id="password"
                    className="login-password"
                    placeholder="Contraseña"
                  />
                ) : (
                  <>
                    <label htmlFor="password">Ingrese su contraseña</label>
                    <input
                      type="password"
                      id="password"
                      className="login-password"
                    />
                  </>
                )}
              </div>
              <button type="submit" className="login-button">
                Iniciar sesión
              </button>
            </div>
          </form>
        </div>
        <div className="login-right">
          <img src={LoginImg} alt="" />
        </div>
      </div>
    </div>
  );
};
