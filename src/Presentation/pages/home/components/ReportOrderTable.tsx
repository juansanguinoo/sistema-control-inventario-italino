import moment from "moment";
import { OrderResponseModel } from "../../../../domain/models/OrderResponseModel";

interface ReportInventoryTableProps {
  orderToReport: OrderResponseModel | null;
}

export const ReportOrderTable = ({
  orderToReport,
}: ReportInventoryTableProps) => {
  return (
    <div className="main-report-table">
      <table>
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Usuario</th>
            <th>Cliente</th>
            <th>Referencia</th>
            <th>Producto</th>
            <th>Precio</th>
            <th>Devolución</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {orderToReport?.orderReturns.map((order: any, index: number) => (
            <tr key={index}>
              <td>{moment(order.created_at).format("DD MMM YYYY - h:mm a")}</td>
              <td>{orderToReport.user.name_user}</td>
              <td>{orderToReport.customer.name_customer}</td>
              <td>{orderToReport.referenceOrder}</td>
              <td>
                {
                  // just 40 characters
                  order.inventory.name_inventory.length > 40
                    ? order.inventory.name_inventory.substring(0, 40) + "..."
                    : order.inventory.name_inventory
                }
              </td>
              <td>{order.inventory.selling_price_inventory}</td>
              <td>{order.quantity}</td>
              <td>
                {
                  // order.inventory.selling_price_inventory * order.quantity
                  new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(
                    order.inventory.selling_price_inventory * order.quantity
                  )
                }
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
