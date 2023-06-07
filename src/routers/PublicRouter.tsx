import { Route, Routes } from "react-router-dom";
import { Login } from "../Presentation/pages/login/Login";

export const PublicRouter = () => {
  return (
    <>
      <Routes>
        <Route path="login" element={<Login />} />
      </Routes>
    </>
  );
};
