import "./styles.css";
import Folder from "../../assets/Folder.svg";
import { PageTitle } from "../../components/titles/PageTitle";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { CardInformation } from "../../components/cards/CardInformation";
import { TableInformation } from "../../components/tables/TableInformation";
import { Dispatch } from "redux";
import { useEffect, useState } from "react";
import {
  deleteInventory,
  getInventory,
  getInventoryByNameOrRefrenceFilter,
} from "../../../store/actions/inventoryActions";
import { inventoryColumns } from "../../utils/columnsDataTable";
import { LinkButton } from "../../components/buttons/LinkButton";
import { useNavigate } from "react-router-dom";
import { InventoryModel } from "../../../domain/models/InventoryModel";
import { FilterMessage } from "../orders/components/FilterMessage";
import { useGetInventoryInfo } from "../../hooks/useGetInventoryInfo";

export const Inventory = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<Dispatch<any>>(); // eslint-disable-line
  const { inventoryInfo } = useGetInventoryInfo();
  const [search, setSearch] = useState("");
  const inventories: InventoryModel[] = useSelector(
    (state: RootState) => state.inventoryReducer.inventories
  );
  const navbarOpen = useSelector(
    (state: RootState) => state.navbarReducer.stateOpen
  );
  const navbarClass = navbarOpen ? "expanded" : "collapsed";

  const handleSearch = () => {
    dispatch(getInventoryByNameOrRefrenceFilter(search));
  };

  useEffect(() => {
    dispatch(getInventory());
  }, [dispatch]);

  const handleEditAction = (params: any) => {
    navigate(`edit-product/${params.id}`);
  };

  const handlePreviewAction = (params: any) => {
    navigate(`product/${params.id}`);
  };

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
          data={[
            inventoryInfo?.totalInventories,
            inventoryInfo?.activeInventories,
          ]}
        />
        <CardInformation
          icon={Folder}
          titles={[
            "Stock Total",
            "Productos inactivos",
            "Productos publicados",
          ]}
          data={[
            inventoryInfo?.totalStock,
            inventoryInfo?.inactiveInventories,
            inventoryInfo?.totalInventoriesPublished,
          ]}
        />
        {inventories.length > 0 ? (
          <>
            <div className="main-reports">
              <div className="main-reports-search-container">
                <input
                  type="text"
                  placeholder="Buscar por nombre o referencia"
                  className="main-reports-search-container-input-text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button
                  className="main-reports-search-container-input-button"
                  onClick={handleSearch}
                >
                  Buscar
                </button>
              </div>
            </div>
            <TableInformation
              categories={inventories}
              columns={inventoryColumns}
              deleteCategory={deleteInventory}
              handleEditAction={handleEditAction}
              handlePreviewAction={handlePreviewAction}
              showDelete={false}
            />
          </>
        ) : (
          <div className="customers-nocustomers">
            <FilterMessage
              messageTitle={"¿No tienes productos aún?"}
              messageParagraph={"Una vez crees productos, los podrás ver aquí."}
            />
            <div className="customer-add-customer">
              <LinkButton title="Crear Producto" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
