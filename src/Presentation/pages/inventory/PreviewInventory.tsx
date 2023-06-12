import { useSelector } from "react-redux";
import "./styles.css";
import { RootState } from "../../../store/store";
import { DetailInventory } from "./components/Detail";

export const PreviewInventory = () => {
  const navbarOpen = useSelector(
    (state: RootState) => state.navbarReducer.stateOpen
  );
  const navbarClass = navbarOpen ? "expanded" : "collapsed";
  return (
    <div className={`inventory-container ${navbarClass}`}>
      <div className="inventory-preview">
        <DetailInventory />
      </div>
    </div>
  );
};
