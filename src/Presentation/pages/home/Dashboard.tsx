import "./styles.css";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { MainHome } from "./components/Main";

export const Dashboard = () => {
  const navbarOpen = useSelector(
    (state: RootState) => state.navbarReducer.stateOpen
  );
  const navbarClass = navbarOpen ? "expanded" : "collapsed";
  return (
    <div className={`main ${navbarClass}`}>
      <div className="main-dashboard">
        <MainHome />
      </div>
    </div>
  );
};
