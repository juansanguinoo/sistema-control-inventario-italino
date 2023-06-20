import { injectable, inject } from "inversify";
import { TYPES } from "../../../config/types";
import type { IOrderRepository } from "../../repositories/IOrderRepository";
import { OrderReturnRequest } from "../../models/OrderReturnRequest";
import { ResponseAPI } from "../../../infrastructure/api/models/ResponseApi";
import { OrderResponse } from "../../models/OrderResponse";

@injectable()
export class CreateOrderReturnUseCase {
  constructor(
    @inject(TYPES.IOrderRepository)
    private orderRepository: IOrderRepository
  ) {}

  async execute(
    order: OrderReturnRequest
  ): Promise<ResponseAPI<OrderResponse>> {
    const response = await this.orderRepository.createOrderReturn(order);
    return response;
  }
}
