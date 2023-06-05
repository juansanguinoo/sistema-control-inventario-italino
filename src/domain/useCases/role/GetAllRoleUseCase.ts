import { inject, injectable } from "inversify";
import { TYPES } from "../../../config/types";
import type { IRoleRepository } from "../../repositories/IRoleRepository";
import { ResponseAPI } from "../../../infrastructure/api/models/ResponseApi";
import { Role } from "../../models/Role";

@injectable()
export class GetAllRolesUseCase {
  constructor(
    @inject(TYPES.IRoleRepository)
    private roleRepository: IRoleRepository
  ) {}

  async execute(): Promise<ResponseAPI<Role[]>> {
    const response = await this.roleRepository.getAllRoles();
    return response;
  }
}
