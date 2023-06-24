import moment from "moment";
import { InventoryModel } from "../../../../domain/models/InventoryModel";

interface ReportTitleProps {
  inventoryToReport: InventoryModel | null;
}

export const ReportTitle = ({ inventoryToReport }: ReportTitleProps) => {
  return (
    <div className="main-report-title">
      <p>Producto: {inventoryToReport?.referenceInventory}</p>
      <p>Stock actual: {inventoryToReport?.stockInventory}</p>
      <p>Fecha {moment().format("DD/MM/YYYY")}</p>
    </div>
  );
};
