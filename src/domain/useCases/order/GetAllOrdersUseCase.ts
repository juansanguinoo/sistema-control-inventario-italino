import { inject, injectable } from "inversify";
import { TYPES } from "../../../config/types";
import type { IOrderRepository } from "../../repositories/IOrderRepository";

@injectable()
export class GetAllOrdersUseCase {
  constructor(
    @inject(TYPES.IOrderRepository)
    private orderRepository: IOrderRepository
  ) {}

  async execute() {
    const response = await this.orderRepository.getAllOrders();
    return response;
  }
}
