import { Route, Routes } from "react-router-dom";
import { Login } from "../Presentation/pages/login/Login";
import { LandingPage } from "../Presentation/pages/landingpage/LandingPage";

export const PublicRouter = () => {
  return (
    <>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </>
  );
};
