export interface OrderResponseModel {
  id: number;
  customer: any;
  user: any;
  statusOrder: string;
  paymentOrder: string;
  typeOrder: string;
  totalOrder: number;
}
