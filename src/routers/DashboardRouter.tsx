import { Home } from "../Presentation/pages/home/Home";
import { Routes, Route } from "react-router-dom";
import { MainHome } from "../Presentation/pages/home/components/Main";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { selectedNavItem } from "../store/actions/navbarActions";
import { Category } from "../Presentation/pages/category/Category";
import { Inventory } from "../Presentation/pages/inventory/Inventory";
import { Users } from "../Presentation/pages/users/Users";
import { Roles } from "../Presentation/pages/roles/Roles";
import { CreateInventory } from "../Presentation/pages/inventory/CreateInventory";
import { Orders } from "../Presentation/pages/orders/Orders";
import { Customers } from "../Presentation/pages/customers/Customers";

export const DashboardRouter = () => {
  const dispatch = useDispatch<Dispatch<any>>(); // eslint-disable-line

  useEffect(() => {
    const currentUrl = window.location.pathname;
    dispatch(selectedNavItem(currentUrl));
  }, [dispatch]);

  return (
    <>
      <Home />
      <Routes>
        {/* <Route path="/dashboard" element={<MainHome title={"Dashboard"} />} /> */}
        <Route path="/" element={<MainHome title={"Dashboard"} />} />
        <Route path="orders" element={<Orders />} />
        <Route path="customers" element={<Customers />} />
        <Route path="inventory" element={<Inventory />} />
        <Route path="inventory/create-product" element={<CreateInventory />} />
        <Route
          path="inventory/edit-product/:id"
          element={<CreateInventory />}
        />
        <Route path="inventory/product/:id" element={<CreateInventory />} />
        <Route path="category" element={<Category />} />
        <Route path="users" element={<Users />} />
        <Route path="role" element={<Roles />} />
      </Routes>
    </>
  );
};
