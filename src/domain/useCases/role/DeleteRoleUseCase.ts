import { inject, injectable } from "inversify";
import { TYPES } from "../../../config/types";
import { ResponseAPI } from "../../../infrastructure/api/models/ResponseApi";
import type { IRoleRepository } from "../../repositories/IRoleRepository";

@injectable()
export class DeleteRoleUseCase {
  constructor(
    @inject(TYPES.IRoleRepository)
    private roleRepository: IRoleRepository
  ) {}

  async execute(idRole: number): Promise<ResponseAPI<boolean>> {
    const response = await this.roleRepository.deleteRole(idRole);
    return response;
  }
}
