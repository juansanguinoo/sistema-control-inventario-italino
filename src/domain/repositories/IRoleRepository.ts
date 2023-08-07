import { ResponseAPI } from "../../infrastructure/api/models/ResponseApi";
import { Activity } from "../models/Activities";
import { Role } from "../models/Role";
import { RoleModel } from "../models/RoleModel";

export interface IRoleRepository {
  getAllRoles(): Promise<ResponseAPI<Role[]>>;
  getRoleById(idRole: number): Promise<ResponseAPI<Role>>;
  createRole(role: RoleModel): Promise<ResponseAPI<Role>>;
  updateRole(idRole: number, role: RoleModel): Promise<ResponseAPI<Role>>;
  deleteRole(idRole: number): Promise<ResponseAPI<boolean>>;
  getAllActivities(): Promise<ResponseAPI<Activity[]>>;
}
