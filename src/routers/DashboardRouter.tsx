import { Home } from "../Presentation/pages/home/Home";
import { Routes, Route } from "react-router-dom";
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
import { PreviewInventory } from "../Presentation/pages/inventory/PreviewInventory";
import { ViewOrderDetails } from "../Presentation/pages/orders/ViewOrderDetails";
import { Dashboard } from "../Presentation/pages/home/Dashboard";

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
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="orders" element={<Orders />} />
        <Route path="orders/orderDetail/:id" element={<ViewOrderDetails />} />
        <Route path="customers" element={<Customers />} />
        <Route path="inventory" element={<Inventory />} />
        <Route path="inventory/create-product" element={<CreateInventory />} />
        <Route
          path="inventory/edit-product/:id"
          element={<CreateInventory />}
        />
        <Route path="inventory/product/:id" element={<PreviewInventory />} />
        <Route path="category" element={<Category />} />
        <Route path="users" element={<Users />} />
        <Route path="role" element={<Roles />} />
      </Routes>
    </>
  );
};
