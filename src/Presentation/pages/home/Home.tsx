import { useEffect, useState } from "react";
import { NavbarHome } from "./components/Navbar";
import { HeaderHome } from "./components/Header";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import "./styles.css";
import {
  handleMobileClicked,
  handleNavbar,
} from "../../../store/actions/navbarActions";

export const Home = () => {
  const [navbarExpanded, setNavbarExpanded] = useState<boolean>(true);
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const dispatch = useDispatch<Dispatch<any>>(); // eslint-disable-line

  const toggleNavbar = () => {
    setNavbarExpanded(!navbarExpanded);
  };

  useEffect(() => {
    dispatch(handleNavbar(navbarExpanded));
  }, [navbarExpanded, dispatch]);

  const toggleMenuResponsive = () => {
    setIsClicked(!isClicked);
  };

  useEffect(() => {
    dispatch(handleMobileClicked(isClicked));
  }, [isClicked, dispatch]);

  return (
    <div className="app">
      <HeaderHome title={"Inventory"} toggleMenu={toggleMenuResponsive} />
      <NavbarHome toggleNavbar={toggleNavbar} />
    </div>
  );
};
