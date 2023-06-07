import { useSelector } from "react-redux";
import { FormInventory } from "./components/Form";
import { RootState } from "../../../store/store";

export const CreateInventory = () => {
  const navbarOpen = useSelector(
    (state: RootState) => state.navbarReducer.stateOpen
  );
  const navbarClass = navbarOpen ? "expanded" : "collapsed";

  return (
    <div className={`inventory-container ${navbarClass}`}>
      <div className="inventory-main">
        <FormInventory />
      </div>
    </div>
  );
};
