import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { PageTitle } from "../../components/titles/PageTitle";
import { Dispatch } from "redux";
import { useState } from "react";
import {
  getInventoryByNameOrRefrence,
  getInventoryToReport,
} from "../../../store/actions/inventoryActions";
import { ReportTitle } from "./components/ReportTitle";
import { ReportInventoryTable } from "./components/ReportInventoryTable";
import { FilterMessage } from "../orders/components/FilterMessage";
import {
  getOrderAndReturnById,
  getOrderByReference,
} from "../../../store/actions/orderActions";
import moment from "moment";
import { ReportTitleOrder } from "./components/ReportTitleOrder";
import { ReportOrderTable } from "./components/ReportOrderTable";

export const DashboardReports = () => {
  const dispatch = useDispatch<Dispatch<any>>(); // eslint-disable-line
  const [search, setSearch] = useState("");
  const [showList, setShowList] = useState(false);
  const [buttonSelected, setButtonSelected] = useState({
    inventory: true,
    returns: false,
  });
  const navbarOpen = useSelector(
    (state: RootState) => state.navbarReducer.stateOpen
  );
  const inventoryByNameOrReference = useSelector(
    (state: RootState) => state.inventoryReducer.inventoryByNameOrReference
  );
  const inventoryToReport = useSelector(
    (state: RootState) => state.inventoryReducer.inventoryToReport
  );
  const orderToReport = useSelector(
    (state: RootState) => state.orderReducer.orderToReport
  );
  const orderByReference = useSelector(
    (state: RootState) => state.orderReducer.ordersByReference
  );
  const navbarClass = navbarOpen ? "expanded" : "collapsed";

  const handleSearch = () => {
    if (buttonSelected.inventory) {
      dispatch(getInventoryByNameOrRefrence(search));
    } else {
      dispatch(getOrderByReference(search));
    }
    setShowList(true);
  };

  return (
    <div className={`main ${navbarClass}`}>
      <div className="orders-header">
        <PageTitle title="Reportes de inventario y ventas" />
      </div>
      <div className="main-container-reports">
        <div className="main-container-reports-header-buttons">
          <button
            className={
              buttonSelected.inventory
                ? "report-header-buttons-active"
                : "report-header-buttons-inactive"
            }
            onClick={() =>
              setButtonSelected({ inventory: true, returns: false })
            }
          >
            Inventario
          </button>
          <button
            className={
              buttonSelected.returns
                ? "report-header-buttons-active"
                : "report-header-buttons-inactive"
            }
            onClick={() =>
              setButtonSelected({ inventory: false, returns: true })
            }
          >
            Devoluciones
          </button>
        </div>
        <div className="main-reports">
          <div className="main-reports-search-container">
            <input
              type="text"
              placeholder="Buscar"
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
          {inventoryByNameOrReference.length > 0 &&
          showList &&
          buttonSelected.inventory ? (
            <div className="main-reports-search-container-auxiliar-list">
              {inventoryByNameOrReference.map((item, index) => (
                <div
                  className="main-reports-search-container-auxiliar-list-item"
                  key={index}
                  onClick={() => {
                    dispatch(getInventoryByNameOrRefrence(""));
                    dispatch(getInventoryToReport(item.id!));
                    setSearch("");
                    setShowList(false);
                  }}
                >
                  <p>
                    {item.nameInventory.length > 40
                      ? item.nameInventory.substring(0, 40) + "..."
                      : item.nameInventory}
                  </p>
                  <p>{item.referenceInventory}</p>
                </div>
              ))}
            </div>
          ) : null}

          {orderByReference.length > 0 && showList && buttonSelected.returns ? (
            <div className="main-reports-search-container-auxiliar-list">
              {orderByReference.map((item, index) => (
                <div
                  className="main-reports-search-container-auxiliar-list-item"
                  key={index}
                  onClick={() => {
                    dispatch(getOrderAndReturnById(item.id!));
                    setSearch("");
                    setShowList(false);
                  }}
                >
                  <p>
                    {item.referenceOrder.length > 40
                      ? item.referenceOrder.substring(0, 40) + "..."
                      : item.referenceOrder}
                  </p>
                  <p>{moment(item.createdAt).format("DD/MM/YYYY")}</p>
                </div>
              ))}
            </div>
          ) : null}

          <div className="main-report-contain">
            {buttonSelected.inventory &&
              !buttonSelected.returns &&
              (inventoryToReport === null ? (
                <FilterMessage
                  messageTitle={"¿Quieres ver el reporte de tus productos?"}
                  messageParagraph={
                    "Busca un producto para obtener su reporte."
                  }
                />
              ) : (
                <>
                  <h2>Italino</h2>
                  <p>Kardex de inventario</p>
                  <ReportTitle inventoryToReport={inventoryToReport} />
                  <ReportInventoryTable inventoryToReport={inventoryToReport} />
                </>
              ))}

            {!buttonSelected.inventory &&
              buttonSelected.returns &&
              (orderToReport === null ? (
                <FilterMessage
                  messageTitle={"¿Quieres ver el reporte de tus devoluciones?"}
                  messageParagraph={"Busca una orden para obtener su reporte."}
                />
              ) : (
                <>
                  <h2>Italino</h2>
                  <p>Devoluciones</p>
                  <ReportTitleOrder orderToReport={orderToReport} />
                  <ReportOrderTable orderToReport={orderToReport} />
                </>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};
