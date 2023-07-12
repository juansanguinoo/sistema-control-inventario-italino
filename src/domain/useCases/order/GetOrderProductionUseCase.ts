import { injectable, inject } from "inversify";
import { TYPES } from "../../../config/types";
import type { IOrderRepository } from "../../repositories/IOrderRepository";

@injectable()
export class GetOrdersProductionUseCase {
  constructor(
    @inject(TYPES.IOrderRepository)
    private orderRepository: IOrderRepository
  ) {}

  async execute() {
    const response = await this.orderRepository.getOrdersProduction();
    return response;
  }
}
