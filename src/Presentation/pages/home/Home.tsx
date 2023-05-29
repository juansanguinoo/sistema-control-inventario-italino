import { useEffect, useState } from "react";
import { NavbarHome } from "./components/Navbar";
import { HeaderHome } from "./components/Header";
import { MainHome } from "./components/Main";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../../store/actions/categoryActions";
import { Dispatch } from "redux";
import { RootState } from "../../../store/store";
import "./styles.css";

export const Home = () => {
  const [navbarExpanded, setNavbarExpanded] = useState<boolean>(true);
  const dispatch = useDispatch<Dispatch<any>>();
  const categories = useSelector(
    (state: RootState) => state.categoryReducer.categories
  );
  const isLoading = useSelector(
    (state: RootState) => state.categoryReducer.loading
  );

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  useEffect(() => {
    console.log("categories", categories);
    console.log("isLoading", isLoading);
  }, [categories]);

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
