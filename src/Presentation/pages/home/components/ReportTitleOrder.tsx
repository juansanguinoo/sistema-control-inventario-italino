import moment from "moment";
import { OrderResponseModel } from "../../../../domain/models/OrderResponseModel";

interface ReportTitleOrderProps {
  orderToReport: OrderResponseModel | null;
}

export const ReportTitleOrder = ({ orderToReport }: ReportTitleOrderProps) => {
  const moneyFormat = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  };

  return (
    <div className="main-report-title">
      <p>Referencia: {orderToReport?.referenceOrder}</p>
      <p>Total: {moneyFormat(orderToReport?.totalOrder!)}</p>
      <p>Fecha {moment(orderToReport?.createdAt).format("DD/MM/YYYY")}</p>
    </div>
  );
};
