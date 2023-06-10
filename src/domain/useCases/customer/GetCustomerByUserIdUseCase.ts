import { inject, injectable } from "inversify";
import { TYPES } from "../../../config/types";
import type { ICustomerRepository } from "../../repositories/ICustomerRepository";
import { ResponseAPI } from "../../../infrastructure/api/models/ResponseApi";
import { Customer } from "../../models/Customer";

@injectable()
export class GetCustomerByUserIdUseCase {
  constructor(
    @inject(TYPES.ICustomerRepository)
    private customerRepository: ICustomerRepository
  ) {}

  async execute(idUser: number): Promise<ResponseAPI<Customer[]>> {
    const response = await this.customerRepository.getCustomerByUserId(idUser);
    return response;
  }
}
