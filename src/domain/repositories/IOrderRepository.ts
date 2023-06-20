import { ResponseAPI } from "../../infrastructure/api/models/ResponseApi";
import { OrderRequest } from "../models/OrderRequest";
import { OrderResponse } from "../models/OrderResponse";
import { OrderReturnRequest } from "../models/OrderReturnRequest";

export interface IOrderRepository {
  getOrderById(idOrder: number): Promise<ResponseAPI<OrderResponse>>;
  createOrder(order: OrderRequest): Promise<ResponseAPI<OrderResponse>>;
  createOrderReturn(
    order: OrderReturnRequest
  ): Promise<ResponseAPI<OrderResponse>>;
  updateOrder(order: OrderRequest): Promise<ResponseAPI<OrderResponse>>;
  getOrderById(idOrder: number): Promise<ResponseAPI<OrderResponse>>;
  getAllOrders(): Promise<ResponseAPI<OrderResponse[]>>;
  getOrdersByUserId(idUser: number): Promise<ResponseAPI<OrderResponse[]>>;
}
