import { inject, injectable } from "inversify";
import { TYPES } from "../../../config/types";
import type { IOrderRepository } from "../../repositories/IOrderRepository";
import { OrderRequest } from "../../models/OrderRequest";
import { ResponseAPI } from "../../../infrastructure/api/models/ResponseApi";
import { OrderResponse } from "../../models/OrderResponse";

@injectable()
export class CreateOrderUseCase {
  constructor(
    @inject(TYPES.IOrderRepository)
    private orderRepository: IOrderRepository
  ) {}

  async execute(order: OrderRequest): Promise<ResponseAPI<OrderResponse>> {
    const response = await this.orderRepository.createOrder(order);
    return response;
  }
}
