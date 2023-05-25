import { useState } from "react";
import { NavbarHome } from "./components/Navbar";
import { HeaderHome } from "./components/Header";
import { MainHome } from "./components/Main";
import "./styles.css";

export const Home = () => {
  const [navbarExpanded, setNavbarExpanded] = useState<boolean>(true);

  const toggleNavbar = () => {
    setNavbarExpanded(!navbarExpanded);
  };

  return (
    <div className="app">
      <NavbarHome expanded={navbarExpanded} toggleNavbar={toggleNavbar} />
      <div className="content">
        <HeaderHome expanded={navbarExpanded} />
        <MainHome expanded={navbarExpanded} />
      </div>
    </div>
  );
};
