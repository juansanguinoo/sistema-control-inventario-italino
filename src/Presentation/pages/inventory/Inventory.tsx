import "./styles.css";
import Folder from "../../assets/Folder.svg";
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
import { useNavigate } from "react-router-dom";
import { InventoryModel } from "../../../domain/models/InventoryModel";
import { useGetInventoryInformation } from "../../hooks/useGetInventoryInformation";

export const Inventory = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<Dispatch<any>>(); // eslint-disable-line
  const inventories: InventoryModel[] = useSelector(
    (state: RootState) => state.inventoryReducer.inventories
  );
  const navbarOpen = useSelector(
    (state: RootState) => state.navbarReducer.stateOpen
  );
  const navbarClass = navbarOpen ? "expanded" : "collapsed";

  useEffect(() => {
    dispatch(getInventory());
  }, [dispatch]);

  const handleEditAction = (params: any) => {
    navigate(`edit-product/${params.id}`);
  };

  const handlePreviewAction = (params: any) => {
    navigate(`product/${params.id}`);
  };

  const { activeProducts, inactiveProducts, publishedProducts, totalStock } =
    useGetInventoryInformation();

  return (
    <div className={`inventory-container ${navbarClass}`}>
      <div className="inventory-header">
        <PageTitle title="Inventario" />
        <LinkButton title="Crear Producto" />
      </div>
      <div className="inventory-main">
        <CardInformation
          icon={Folder}
          titles={["Todos los productos", "Productos activos"]}
          data={[inventories.length, activeProducts.length]}
        />
        <CardInformation
          icon={Folder}
          titles={[
            "Stock Total",
            "Productos inactivos",
            "Productos publicados",
          ]}
          data={[totalStock, inactiveProducts.length, publishedProducts.length]}
        />
        <TableInformation
          categories={inventories}
          columns={inventoryColumns}
          deleteCategory={deleteInventory}
          handleEditAction={handleEditAction}
          handlePreviewAction={handlePreviewAction}
          showDelete={false}
        />
      </div>
    </div>
  );
};
