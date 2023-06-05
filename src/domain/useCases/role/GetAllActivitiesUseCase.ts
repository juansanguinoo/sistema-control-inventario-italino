import { injectable, inject } from "inversify";
import { TYPES } from "../../../config/types";
import type { IRoleRepository } from "../../repositories/IRoleRepository";
import { ResponseAPI } from "../../../infrastructure/api/models/ResponseApi";
import { Activity } from "../../models/Activities";

@injectable()
export class GetAllActivitiesUseCase {
  constructor(
    @inject(TYPES.IRoleRepository)
    private roleRepository: IRoleRepository
  ) {}

  async execute(): Promise<ResponseAPI<Activity[]>> {
    const response = await this.roleRepository.getAllActivities();
    return response;
  }
}
