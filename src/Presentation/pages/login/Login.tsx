import "./styles.css";
import LoginImg from "../../assets/Login.svg";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { loginUser } from "../../../store/actions/userAction";

export const Login = () => {
  const dispatch = useDispatch<Dispatch<any>>(); // eslint-disable-line
  const [smallScreen, setSmallScreen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // useEffect(() => {
  //   dispatch(loginUser(email, password));
  // }, [dispatch]);

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

  const handleSubmit = (e: any) => {
    e.preventDefault();
    dispatch(loginUser(email, password));
  };

  return (
    <div className="login">
      <div className="login-container">
        <div className="login-left">
          <div className="login-header">
            <h1>Bienvenido a nuestra aplicación</h1>
            <p>Por favor inicia sesión</p>
          </div>
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="login-form-content">
              <div className="form-item">
                {smallScreen ? (
                  <input
                    type="text"
                    id="email"
                    className="login-email"
                    placeholder="Correo electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                ) : (
                  <>
                    <label htmlFor="email">Ingrese su correo electronico</label>
                    <input
                      type="text"
                      id="email"
                      className="login-email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                ) : (
                  <>
                    <label htmlFor="password">Ingrese su contraseña</label>
                    <input
                      type="password"
                      id="password"
                      className="login-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
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
