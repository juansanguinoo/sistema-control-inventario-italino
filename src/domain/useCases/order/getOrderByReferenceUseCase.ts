import { injectable, inject } from "inversify";
import { TYPES } from "../../../config/types";
import type { IOrderRepository } from "../../repositories/IOrderRepository";

@injectable()
export class GetOrderByReferenceUseCase {
  constructor(
    @inject(TYPES.IOrderRepository)
    private orderRepository: IOrderRepository
  ) {}

  async execute(referenceOrder: string) {
    const response = await this.orderRepository.getOrderByReference(
      referenceOrder
    );
    return response;
  }
}
