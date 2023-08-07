export interface OrderProductionResponseModel {
  id?: number;
  referenceOrder: string;
  statusOrder: string;
  descriptionOrder: string;
  paymentOrder: string;
  typeOrder: string;
  totalOrder: number;
  createdAt: string;
  orderDetails: any;
}
