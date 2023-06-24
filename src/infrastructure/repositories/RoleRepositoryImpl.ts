import { inject, injectable } from "inversify";
import { Role } from "../../domain/models/Role";
import { RoleModel } from "../../domain/models/RoleModel";
import { IRoleRepository } from "../../domain/repositories/IRoleRepository";
import { ResponseAPI } from "../api/models/ResponseApi";
import type { IHttpClient } from "../api/interfaces/IHttpClient";
import { TYPES } from "../../config/types";
import { Activity } from "../../domain/models/Activities";

@injectable()
export class RoleRepositoryImpl implements IRoleRepository {
  private readonly httpClient: IHttpClient;
  private readonly baseUrl: string;
  private readonly baseUrlActivities: string;

  constructor(
    @inject(TYPES.HttpClient) httpClient: IHttpClient,
    apiUrl = "http://localhost:3000"
  ) {
    this.httpClient = httpClient;
    this.baseUrl = `${apiUrl}/role`;
    this.baseUrlActivities = `${apiUrl}/activity`;
  }

  async getAllActivities(): Promise<ResponseAPI<Activity[]>> {
    const response = await this.httpClient.get<ResponseAPI<Activity[]>>(
      `${this.baseUrlActivities}`
    );
    return response;
  }

  async getAllRoles(): Promise<ResponseAPI<Role[]>> {
    const response = await this.httpClient.get<ResponseAPI<Role[]>>(
      this.baseUrl
    );
    return response;
  }
  async getRoleById(idRole: number): Promise<ResponseAPI<Role>> {
    const response = await this.httpClient.get<ResponseAPI<Role>>(
      `${this.baseUrl}/${idRole}`
    );
    return response;
  }
  async createRole(role: RoleModel): Promise<ResponseAPI<Role>> {
    const response = await this.httpClient.post<ResponseAPI<Role>, RoleModel>(
      this.baseUrl,
      role
    );
    return response;
  }
  async updateRole(
    idRole: number,
    role: RoleModel
  ): Promise<ResponseAPI<Role>> {
    const response = await this.httpClient.put<ResponseAPI<Role>, RoleModel>(
      `${this.baseUrl}/${idRole}`,
      role
    );
    return response;
  }
  async deleteRole(idRole: number): Promise<ResponseAPI<boolean>> {
    const response = await this.httpClient.delete<ResponseAPI<boolean>>(
      `${this.baseUrl}/${idRole}`
    );
    return response;
  }
}
