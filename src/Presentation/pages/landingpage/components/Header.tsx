import { useIsMobile } from "../../../hooks/useIsMobile";
import Menu from "../../../assets/menu.svg";
import { useEffect, useState } from "react";

export const HeaderLandingPage = () => {
  const [isClicked, setIsClicked] = useState(false);
  const { isMobile } = useIsMobile();

  useEffect(() => console.log(isClicked), [isClicked]);

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
            <a href="#">Nosotros</a>
          </li>
          <li>
            <a href="#">Productos</a>
          </li>
          <li>
            <a href="#">Contacto</a>
          </li>
        </ul>
      </div>
    </div>
  );
};
