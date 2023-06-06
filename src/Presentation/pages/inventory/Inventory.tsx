import "./styles.css";
import { PageTitle } from "../../components/titles/PageTitle";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { CardInformation } from "../../components/cards/CardInformation";
import { TableInformation } from "../../components/tables/TableInformation";
import { Dispatch } from "redux";
import { useEffect } from "react";
import {
  deleteInventory,
  getInventory,
} from "../../../store/actions/inventoryActions";
import { inventoryColumns } from "../../utils/columnsDataTable";
import { LinkButton } from "../../components/buttons/LinkButton";

export const Inventory = () => {
  const dispatch = useDispatch<Dispatch<any>>(); // eslint-disable-line
  const inventories = useSelector(
    (state: RootState) => state.inventoryReducer.inventories
  );
  const navbarOpen = useSelector(
    (state: RootState) => state.navbarReducer.stateOpen
  );
  const navbarClass = navbarOpen ? "expanded" : "collapsed";

  useEffect(() => {
    dispatch(getInventory());
  }, [dispatch]);

  return (
    <div className={`inventory-container ${navbarClass}`}>
      <div className="inventory-header">
        <PageTitle title="Inventario" />
        <LinkButton title="Crear Producto" />
      </div>
      <div className="inventory-main">
        <CardInformation />
        <CardInformation />
        <TableInformation
          type="inventory"
          categories={inventories}
          columns={inventoryColumns}
          deleteCategory={deleteInventory}
        />
      </div>
    </div>
  );
};
