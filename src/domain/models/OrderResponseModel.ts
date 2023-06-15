export interface OrderResponseModel {
  id: number;
  customer: any;
  user: any;
  orderDetails: any;
  statusOrder: string;
  paymentOrder: string;
  typeOrder: string;
  totalOrder: number;
  createdAt: string;
}
