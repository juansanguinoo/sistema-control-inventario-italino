import { inject, injectable } from "inversify";
import { TYPES } from "../../../config/types";
import type { IOrderRepository } from "../../repositories/IOrderRepository";

@injectable()
export class GetOrderByUserIdUseCase {
  constructor(
    @inject(TYPES.IOrderRepository)
    private orderRepository: IOrderRepository
  ) {}

  async execute(idUser: number) {
    const response = await this.orderRepository.getOrdersByUserId(idUser);
    return response;
  }
}
