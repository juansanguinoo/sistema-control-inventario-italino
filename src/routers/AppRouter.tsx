import { Route, Routes } from "react-router-dom";
import { DashboardRouter } from "./DashboardRouter";
import { PublicRouter } from "./publicRouter";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<h1>Home</h1>} />
      <Route path="/private/*" element={<DashboardRouter />} />
      <Route path="/*" element={<PublicRouter />} />
    </Routes>
  );
};
