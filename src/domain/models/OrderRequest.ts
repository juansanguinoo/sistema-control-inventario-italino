import { OrderDetailRequest } from "./OrderDetailRequest";

export interface OrderRequest {
  orderId?: number;
  id?: number;
  customerId: number;
  userId: number;
  statusOrder: string;
  paymentOrder: string;
  typeOrder: string;
  totalOrder: number;
  orderDetails: OrderDetailRequest[];
}
