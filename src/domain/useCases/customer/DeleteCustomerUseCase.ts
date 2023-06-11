import { inject, injectable } from "inversify";
import { TYPES } from "../../../config/types";
import type { ICustomerRepository } from "../../repositories/ICustomerRepository";
import { ResponseAPI } from "../../../infrastructure/api/models/ResponseApi";

@injectable()
export class DeleteCustomerUseCase {
  constructor(
    @inject(TYPES.ICustomerRepository)
    private customerRepository: ICustomerRepository
  ) {}

  async execute(idCustomer: number): Promise<ResponseAPI<boolean>> {
    const response = await this.customerRepository.deleteCustomer(idCustomer);
    return response;
  }
}
