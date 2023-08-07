import { injectable, inject } from "inversify";
import { TYPES } from "../../../config/types";
import type { IOrderRepository } from "../../repositories/IOrderRepository";
import { OrderRequest } from "../../models/OrderRequest";
import { ResponseAPI } from "../../../infrastructure/api/models/ResponseApi";
import { OrderResponse } from "../../models/OrderResponse";

@injectable()
export class UpdateOrderUseCase {
  constructor(
    @inject(TYPES.IOrderRepository)
    private orderRepository: IOrderRepository
  ) {}

  async execute(order: OrderRequest): Promise<ResponseAPI<OrderResponse>> {
    const response = await this.orderRepository.updateOrder(order);
    return response;
  }
}
