import { PageTitle } from "../../components/titles/PageTitle";
import { HeaderButton } from "../../components/buttons/HeaderButton";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { CardInformation } from "../../components/cards/CardInformation";
import { FormInventory } from "./components/Form";
import { TableInformation } from "../../components/tables/TableInformation";
import { Dispatch } from "redux";
import { useEffect } from "react";
import { getInventory } from "../../../store/actions/inventoryActions";

export const Inventory = () => {
  const dispatch = useDispatch<Dispatch<any>>(); // eslint-disable-line
  const inventory = useSelector(
    (state: RootState) => state.inventoryReducer.inventories
  );
  const navbarOpen = useSelector(
    (state: RootState) => state.navbarReducer.stateOpen
  );
  const navbarClass = navbarOpen ? "expanded" : "collapsed";

  useEffect(() => {
    dispatch(getInventory());
  }, [dispatch]);

  useEffect(() => {
    console.log(inventory);
  }, [inventory]);

  return (
    <div className={`inventory-container ${navbarClass}`}>
      <div className="inventory-header">
        <PageTitle title="Inventario" />
        <HeaderButton title="Crear un nuevo producto" />
      </div>
      <div className="inventory-main">
        <CardInformation />
        <CardInformation />
      </div>
    </div>
  );
};
