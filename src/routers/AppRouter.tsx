import { Navigate, Route, Routes } from "react-router-dom";
import { DashboardRouter } from "./DashboardRouter";
import { PublicRouter } from "./PublicRouter";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useEffect } from "react";
import { checkLogin } from "../store/actions/userAction";
import { Dispatch } from "redux";

export const AppRouter = () => {
  const dispatch = useDispatch<Dispatch<any>>(); // eslint-disable-line
  const loggedIn = useSelector(
    (state: RootState) => state.userReducer.loggedIn
  );

  useEffect(() => {
    dispatch(checkLogin());
  }, [dispatch]);

  const PrivateRoute = ({ children }: any) => {
    return loggedIn ? children : <Navigate to="/" />;
  };
  const PublicRoute = ({ children }: any) => {
    const selectedNavItem = localStorage.getItem("selectedNavItem");
    const route =
      selectedNavItem && selectedNavItem !== "/"
        ? selectedNavItem
        : "/private/users";

    return loggedIn ? <Navigate to={`${route}`} /> : children;
  };

  return (
    <Routes>
      <Route
        path="/"
        element={<PublicRoute children={<h1>Home</h1>}></PublicRoute>}
      />
      <Route
        path="/private/*"
        element={<PrivateRoute children={<DashboardRouter />}></PrivateRoute>}
      />
      <Route
        path="/*"
        element={<PublicRoute children={<PublicRouter />}></PublicRoute>}
      />
    </Routes>
  );
};
