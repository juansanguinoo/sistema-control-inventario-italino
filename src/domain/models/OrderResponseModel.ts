export interface OrderResponseModel {
  id: number;
  referenceOrder: string;
  customer: any;
  user: any;
  orderDetails: any;
  statusOrder: string;
  descriptionOrder: string;
  paymentOrder: string;
  typeOrder: string;
  totalOrder: number;
  createdAt: string;
  orderReturns: any;
}
