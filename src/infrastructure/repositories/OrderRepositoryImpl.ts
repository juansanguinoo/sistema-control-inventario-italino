import { TYPES } from "../../config/types";
import { OrderRequest } from "../../domain/models/OrderRequest";
import { OrderResponse } from "../../domain/models/OrderResponse";
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
    apiUrl = "http://localhost:3000"
  ) {
    this.httpClient = httpClient;
    this.baseUrl = `${apiUrl}`;
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
