import { ProductMostSold } from "./ProductMostSold";
import { SoldByMonth } from "./SoldByMonth";

export interface OrderInfoResponse {
  totalOrders: number;
  totalOrdersDelivered: number;
  totalOrdersPending: number;
  totalOrdersCanceled: number;
  totalOrdersInProcess: number;
  productsMostSold: ProductMostSold[];
  soldsByMonth: SoldByMonth[];
}
