import { Home } from "../Presentation/pages/home/Home";
import { Routes, Route } from "react-router-dom";
import { MainHome } from "../Presentation/pages/home/components/Main";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { selectedNavItem } from "../store/actions/navbarActions";
import { Category } from "../Presentation/pages/category/Category";

export const AppRouter = () => {
  const dispatch = useDispatch<Dispatch<any>>();

  useEffect(() => {
    const currentUrl = window.location.pathname;
    dispatch(selectedNavItem(currentUrl));
  }, []);

  return (
    <>
      <Home />
      <Routes>
        <Route path="/" element={<MainHome title={"Dashboard"} />} />
        <Route path="orders" element={<MainHome title={"Ordenes"} />} />
        <Route path="customers" element={<MainHome title={"Clientes"} />} />
        <Route path="inventory" element={<MainHome title={"Inventario"} />} />
        <Route path="category" element={<Category />} />
      </Routes>
    </>
  );
};
