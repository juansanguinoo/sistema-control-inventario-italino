import { inject, injectable } from "inversify";
import { ResponseAPI } from "../../../infrastructure/api/models/ResponseApi";
import { Role } from "../../models/Role";
import { RoleModel } from "../../models/RoleModel";
import { TYPES } from "../../../config/types";
import type { IRoleRepository } from "../../repositories/IRoleRepository";

@injectable()
export class CreateRoleUseCase {
  constructor(
    @inject(TYPES.IRoleRepository)
    private roleRepository: IRoleRepository
  ) {}

  async execute(role: RoleModel): Promise<ResponseAPI<Role>> {
    const response = await this.roleRepository.createRole(role);
    return response;
  }
}
