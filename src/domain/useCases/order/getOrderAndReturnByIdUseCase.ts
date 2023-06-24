import { injectable, inject } from "inversify";
import { TYPES } from "../../../config/types";
import type { IOrderRepository } from "../../repositories/IOrderRepository";

@injectable()
export class GetOrderAndReturnByIdUseCase {
  constructor(
    @inject(TYPES.IOrderRepository)
    private orderRepository: IOrderRepository
  ) {}

  async execute(idOrder: number) {
    const response = await this.orderRepository.getOrderAndReturnById(idOrder);
    return response;
  }
}
