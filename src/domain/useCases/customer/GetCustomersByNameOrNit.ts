import { injectable, inject } from "inversify";
import { TYPES } from "../../../config/types";
import type { ICustomerRepository } from "../../repositories/ICustomerRepository";

@injectable()
export class GetCustomersByNameOrNitUseCase {
  constructor(
    @inject(TYPES.ICustomerRepository)
    private customerRepository: ICustomerRepository
  ) {}

  async execute(nameOrNit: string) {
    const response = await this.customerRepository.getCustomerByNameOrNIT(
      nameOrNit
    );
    return response;
  }
}
