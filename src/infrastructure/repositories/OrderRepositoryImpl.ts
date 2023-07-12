import { TYPES } from "../../config/types";
import { OrderInfoResponse } from "../../domain/models/OrderInfoResponse";
import { OrderRequest } from "../../domain/models/OrderRequest";
import { OrderResponse } from "../../domain/models/OrderResponse";
import { OrderReturnRequest } from "../../domain/models/OrderReturnRequest";
import { IOrderRepository } from "../../domain/repositories/IOrderRepository";
import type { IHttpClient } from "../api/interfaces/IHttpClient";
import { ResponseAPI } from "../api/models/ResponseApi";
import { injectable, inject } from "inversify";

@injectable()
export class OrderRepositoryImpl implements IOrderRepository {
  private readonly httpClient: IHttpClient;
  private readonly baseUrl: string;

  constructor(
    @inject(TYPES.HttpClient) httpClient: IHttpClient,
    apiUrl = import.meta.env.VITE_BACKEND_URL
  ) {
    this.httpClient = httpClient;
    this.baseUrl = `${apiUrl}`;
  }

  async getOrdersProduction(): Promise<ResponseAPI<OrderResponse[]>> {
    const response = await this.httpClient.get<ResponseAPI<OrderResponse[]>>(
      `${this.baseUrl}/order-production`
    );
    return response;
  }

  async getOrderStats(): Promise<ResponseAPI<OrderInfoResponse>> {
    const response = await this.httpClient.get<ResponseAPI<OrderInfoResponse>>(
      `${this.baseUrl}/order-stats/stats`
    );
    return response;
  }

  async getOrderByReference(
    referenceOrder: string
  ): Promise<ResponseAPI<OrderResponse[]>> {
    const response = await this.httpClient.get<ResponseAPI<OrderResponse[]>>(
      `${this.baseUrl}/order/reference/${referenceOrder}`
    );
    return response;
  }

  async getOrderAndReturnById(
    idOrder: number
  ): Promise<ResponseAPI<OrderResponse>> {
    const response = await this.httpClient.get<ResponseAPI<OrderResponse>>(
      `${this.baseUrl}/order/return/${idOrder}`
    );
    return response;
  }

  async createOrderReturn(
    order: OrderReturnRequest
  ): Promise<ResponseAPI<OrderResponse>> {
    const response = await this.httpClient.post<
      ResponseAPI<OrderResponse>,
      OrderReturnRequest
    >(`${this.baseUrl}/order/return`, order);
    return response;
  }
  async getAllOrders(): Promise<ResponseAPI<OrderResponse[]>> {
    const response = await this.httpClient.get<ResponseAPI<OrderResponse[]>>(
      `${this.baseUrl}/order`
    );
    return response;
  }
  async getOrdersByUserId(
    idUser: number
  ): Promise<ResponseAPI<OrderResponse[]>> {
    const response = await this.httpClient.get<ResponseAPI<OrderResponse[]>>(
      `${this.baseUrl}/order/byUser/${idUser}`
    );
    return response;
  }

  async getOrderById(idOrder: number): Promise<ResponseAPI<OrderResponse>> {
    const response = await this.httpClient.get<ResponseAPI<OrderResponse>>(
      `${this.baseUrl}/order/${idOrder}`
    );
    return response;
  }
  async createOrder(order: OrderRequest): Promise<ResponseAPI<OrderResponse>> {
    const response = await this.httpClient.post<
      ResponseAPI<OrderResponse>,
      OrderRequest
    >(`${this.baseUrl}/order`, order);
    return response;
  }
  async updateOrder(order: OrderRequest): Promise<ResponseAPI<OrderResponse>> {
    const response = await this.httpClient.put<
      ResponseAPI<OrderResponse>,
      OrderRequest
    >(`${this.baseUrl}/order`, order);
    return response;
  }
}
