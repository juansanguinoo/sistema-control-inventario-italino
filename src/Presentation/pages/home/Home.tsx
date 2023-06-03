import { useEffect, useState } from "react";
import { NavbarHome } from "./components/Navbar";
import { HeaderHome } from "./components/Header";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import "./styles.css";
import { handleNavbar } from "../../../store/actions/navbarActions";

export const Home = () => {
  const [navbarExpanded, setNavbarExpanded] = useState<boolean>(true);
  const dispatch = useDispatch<Dispatch<any>>();

  const toggleNavbar = () => {
    setNavbarExpanded(!navbarExpanded);
  };

  useEffect(() => {
    dispatch(handleNavbar(navbarExpanded));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navbarExpanded]);

  return (
    <div className="app">
      <HeaderHome title={"Inventory"} />
      <NavbarHome toggleNavbar={toggleNavbar} />
    </div>
  );
};
