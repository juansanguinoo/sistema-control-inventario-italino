import { inject, injectable } from "inversify";
import { TYPES } from "../../../config/types";
import type { ICustomerRepository } from "../../repositories/ICustomerRepository";

@injectable()
export class GetCustomerInfoUseCase {
  constructor(
    @inject(TYPES.ICustomerRepository)
    private customerRepository: ICustomerRepository
  ) {}

  async execute() {
    const customers = await this.customerRepository.getCustomerInfo();
    return customers;
  }
}
