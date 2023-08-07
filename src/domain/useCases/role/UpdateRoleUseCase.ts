import { inject, injectable } from "inversify";
import { TYPES } from "../../../config/types";
import type { IRoleRepository } from "../../repositories/IRoleRepository";
import { RoleModel } from "../../models/RoleModel";
import { ResponseAPI } from "../../../infrastructure/api/models/ResponseApi";
import { Role } from "../../models/Role";

@injectable()
export class UpdateRoleUseCase {
  constructor(
    @inject(TYPES.IRoleRepository)
    private roleRepository: IRoleRepository
  ) {}

  async execute(idRole: number, role: RoleModel): Promise<ResponseAPI<Role>> {
    const response = await this.roleRepository.updateRole(idRole, role);
    return response;
  }
}
