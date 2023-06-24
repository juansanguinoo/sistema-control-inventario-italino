import "./styles.css";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { MainHome } from "./components/Main";
import { PageTitle } from "../../components/titles/PageTitle";
import { LinkButton } from "../../components/buttons/LinkButton";

export const Dashboard = () => {
  const navbarOpen = useSelector(
    (state: RootState) => state.navbarReducer.stateOpen
  );
  const navbarClass = navbarOpen ? "expanded" : "collapsed";
  return (
    <div className={`main ${navbarClass}`}>
      <div className="main-dashboard">
        <div className="orders-header">
          <PageTitle title="Dashboard" />
          <div className="orders-header-buttons">
            <LinkButton
              title="Crear Producto"
              to={"/private/dashboard/view-reports"}
            />
          </div>
        </div>
        <MainHome />
      </div>
    </div>
  );
};
