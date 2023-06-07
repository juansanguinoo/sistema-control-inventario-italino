import { ResponseAPI } from "../../infrastructure/api/models/ResponseApi";
import { User } from "../models/User";
import { UserModel } from "../models/UserModel";

export interface IUserRepository {
  getAllUsers(): Promise<ResponseAPI<User[]>>;
  getUserById(idUser: number): Promise<ResponseAPI<User>>;
  createUser(user: UserModel): Promise<ResponseAPI<User>>;
  updateUser(idUser: number, user: UserModel): Promise<ResponseAPI<boolean>>;
  deleteUser(idUser: number): Promise<ResponseAPI<boolean>>;
}