import { inject, injectable } from "inversify";
import { TYPES } from "../../../config/types";
import type { IRoleRepository } from "../../repositories/IRoleRepository";
import { ResponseAPI } from "../../../infrastructure/api/models/ResponseApi";
import { Role } from "../../models/Role";

@injectable()
export class GetRoleUseCase {
  constructor(
    @inject(TYPES.IRoleRepository)
    private roleRepository: IRoleRepository
  ) {}

  async execute(idRole: number): Promise<ResponseAPI<Role>> {
    const response = await this.roleRepository.getRoleById(idRole);
    return response;
  }
}
