import { ResponseAPI } from "../../infrastructure/api/models/ResponseApi";
import { OrderRequest } from "../models/OrderRequest";
import { OrderResponse } from "../models/OrderResponse";

export interface IOrderRepository {
  getOrderById(idOrder: number): Promise<ResponseAPI<OrderResponse>>;
  createOrder(order: OrderRequest): Promise<ResponseAPI<OrderResponse>>;
  updateOrder(order: OrderRequest): Promise<ResponseAPI<OrderResponse>>;
}
