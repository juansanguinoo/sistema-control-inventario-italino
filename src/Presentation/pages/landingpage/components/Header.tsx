import { useIsMobile } from "../../../hooks/useIsMobile";
import Menu from "../../../assets/menu.svg";
import { useState } from "react";
import { Link } from "react-router-dom";

export const HeaderLandingPage = () => {
  const [isClicked, setIsClicked] = useState(false);
  const { isMobile } = useIsMobile();

  return (
    <div className="header-landing">
      {isMobile ? null : (
        <div className="header-logo">
          <h4>Moda y Estilo Italino</h4>
        </div>
      )}
      {isMobile && (
        <div className="header-burger-menu">
          <img src={Menu} alt="" onClick={() => setIsClicked(!isClicked)} />
        </div>
      )}
      <div
        className={`header-menu ${isMobile ? "responsive" : ""} ${
          isClicked ? "click" : ""
        }`}
      >
        <ul>
          <li>
            <a href="#">Inicio</a>
          </li>
          <li>
            <a href="#Productos">Productos</a>
          </li>
          <li>
            <a href="#Nosotros">Nosotros</a>
          </li>
          <li>
            <a href="#Contacto">Contacto</a>
          </li>
          {/* <li>
            <a href="#Contacto">Ingresar</a>
          </li> */}
          <Link to="login">Ingresar</Link>
        </ul>
      </div>
    </div>
  );
};
