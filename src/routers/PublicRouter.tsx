import { Route, Routes } from "react-router-dom";
import { Login } from "../Presentation/pages/login/Login";
import { LandingPage } from "../Presentation/pages/landingpage/LandingPage";
import { RecoverPassword } from "../Presentation/pages/recoverpassword/RecoverPassword";
import { ResetPassword } from "../Presentation/pages/recoverpassword/ResetPassword";

export const PublicRouter = () => {
  return (
    <>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="recover-password" element={<RecoverPassword />} />
        <Route path="reset-password/*" element={<ResetPassword />} />
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </>
  );
};
