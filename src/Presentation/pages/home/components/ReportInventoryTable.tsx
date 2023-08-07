import moment from "moment";
import { InventoryModel } from "../../../../domain/models/InventoryModel";

interface ReportInventoryTableProps {
  inventoryToReport: InventoryModel | null;
}

export const ReportInventoryTable = ({
  inventoryToReport,
}: ReportInventoryTableProps) => {
  return (
    <div className="main-report-table">
      <table>
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Movimiento</th>
            <th>Detalle</th>
            <th>Usuario</th>
            <th>Cantidad</th>
          </tr>
        </thead>
        <tbody>
          {inventoryToReport?.addInventory.map(
            (inventory: any, index: number) => (
              <tr key={index}>
                <td>
                  {moment(inventory.created_at).format("DD MMM YYYY - h:mm a")}
                </td>
                <td
                  className={`report-table-td-status ${inventory.type.toLowerCase()}`}
                >
                  {inventory.type}
                </td>
                <td>{inventory.detail}</td>
                <td>{inventory.user.name_user}</td>
                <td>{inventory.quantity}</td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};
