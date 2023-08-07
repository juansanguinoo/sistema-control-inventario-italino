import { inject, injectable } from "inversify";
import { TYPES } from "../../../config/types";
import type { IOrderRepository } from "../../repositories/IOrderRepository";

@injectable()
export class GetOrderByIdUseCase {
  constructor(
    @inject(TYPES.IOrderRepository)
    private orderRepository: IOrderRepository
  ) {}

  async execute(idOrder: number) {
    const response = await this.orderRepository.getOrderById(idOrder);
    return response;
  }
}
