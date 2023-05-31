import { useEffect, useState } from "react";
import { NavbarHome } from "./components/Navbar";
import { HeaderHome } from "./components/Header";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import "./styles.css";
import { handleNavbar } from "../../../store/actions/navbarActions";
import { getCategories } from "../../../store/actions/categoryActions";
import { RootState } from "../../../store/store";

export const Home = () => {
  const [navbarExpanded, setNavbarExpanded] = useState<boolean>(true);
  const dispatch = useDispatch<Dispatch<any>>();
  const categories = useSelector(
    (state: RootState) => state.categoryReducer.categories
  );

  useEffect(() => {
    console.log(categories);
  }, [categories]);

  const toggleNavbar = () => {
    setNavbarExpanded(!navbarExpanded);
  };

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  useEffect(() => {
    dispatch(handleNavbar(navbarExpanded));
  }, [navbarExpanded]);

  return (
    <div className="app">
      <HeaderHome title={"Inventory"} />
      <NavbarHome toggleNavbar={toggleNavbar} />
    </div>
  );
};
