import { Container } from "inversify";
import { ICategoryRepository } from "../domain/repositories/ICategoryRepository";
import { TYPES } from "./types";
import { CategoryRepositoryImpl } from "../infrastructure/repositories/CategoryRepositoryImpl";
import { IHttpClient } from "../infrastructure/api/interfaces/IHttpClient";
import { AxiosHttpClient } from "../infrastructure/api/AxiosHttpClient";
import { CreateCategoryUseCase } from "../domain/useCases/category/CreateCategoryUseCase";
import { GetCategoriesUseCase } from "../domain/useCases/category/GetCategoriesUseCase";
import { DeleteCategoryUseCase } from "../domain/useCases/category/DeleteCategoryUseCase";
import { UpdateCategoryUseCase } from "../domain/useCases/category/UpdateCategoryUseCase";
import { IInventoryRepository } from "../domain/repositories/IInventoryRepository";
import { InventoryRepositoryImpl } from "../infrastructure/repositories/InventoryRepositoryImpl";
import { CreateInventoryUseCase } from "../domain/useCases/inventory/CreateInventoryUseCase";
import { GetInventoriesUseCase } from "../domain/useCases/inventory/GetInventoriesUseCase";
import { DeleteInventoryUseCase } from "../domain/useCases/inventory/DeleteInventoryUseCase";
import { UpdateInventoryUseCase } from "../domain/useCases/inventory/UpdateInventoryUseCase";
import { IUserRepository } from "../domain/repositories/IUserRepository";
import { UserRepositoryImpl } from "../infrastructure/repositories/UserRepositoryImpl";
import { CreateUserUseCase } from "../domain/useCases/user/CreateUserUseCase";
import { GetUserUseCase } from "../domain/useCases/user/GetUserUseCase";
import { GetAllUserUseCase } from "../domain/useCases/user/GetAllUserUseCase";
import { DeleteUserUseCase } from "../domain/useCases/user/DeleteUserUseCase";
import { UpdateUserUseCase } from "../domain/useCases/user/UpdateUserUseCase";
import { IRoleRepository } from "../domain/repositories/IRoleRepository";
import { RoleRepositoryImpl } from "../infrastructure/repositories/RoleRepositoryImpl";
import { CreateRoleUseCase } from "../domain/useCases/role/CreateRoleUseCase";
import { GetRoleUseCase } from "../domain/useCases/role/GetRoleUseCase";
import { GetAllRolesUseCase } from "../domain/useCases/role/GetAllRoleUseCase";
import { DeleteRoleUseCase } from "../domain/useCases/role/DeleteRoleUseCase";
import { UpdateRoleUseCase } from "../domain/useCases/role/UpdateRoleUseCase";
import { GetAllActivitiesUseCase } from "../domain/useCases/role/GetAllActivitiesUseCase";
import { LoginUserUseCase } from "../domain/useCases/user/LoginUserUseCase";
import { CheckLoginUserUseCase } from "../domain/useCases/user/CheckLoginUserUseCase";

const container = new Container();

// HttpClient
container
  .bind<IHttpClient>(TYPES.HttpClient)
  .to(AxiosHttpClient)
  .inSingletonScope();

// BaseUrl
container.bind<string>(TYPES.BaseUrl).toConstantValue("http://localhost:3000");

// Repositories
container
  .bind<ICategoryRepository>(TYPES.ICategoryRepository)
  .to(CategoryRepositoryImpl)
  .inSingletonScope();
container
  .bind<IUserRepository>(TYPES.IUserRepository)
  .to(UserRepositoryImpl)
  .inSingletonScope();
container
  .bind<IRoleRepository>(TYPES.IRoleRepository)
  .to(RoleRepositoryImpl)
  .inSingletonScope();

container
  .bind<IInventoryRepository>(TYPES.IInventoryRepository)
  .to(InventoryRepositoryImpl)
  .inSingletonScope();

// UseCases
container
  .bind<CreateCategoryUseCase>(TYPES.CreateCategoryUseCase)
  .to(CreateCategoryUseCase);
container
  .bind<GetCategoriesUseCase>(TYPES.GetCategoriesUseCase)
  .to(GetCategoriesUseCase);
container
  .bind<DeleteCategoryUseCase>(TYPES.DeleteCategoryUseCase)
  .to(DeleteCategoryUseCase);
container
  .bind<UpdateCategoryUseCase>(TYPES.UpdateCategoryUseCase)
  .to(UpdateCategoryUseCase);

container
  .bind<CreateInventoryUseCase>(TYPES.CreateInventoryUseCase)
  .to(CreateInventoryUseCase);
container
  .bind<GetInventoriesUseCase>(TYPES.GetInventoriesUseCase)
  .to(GetInventoriesUseCase);
container
  .bind<DeleteInventoryUseCase>(TYPES.DeleteInventoryUseCase)
  .to(DeleteInventoryUseCase);
container
  .bind<UpdateInventoryUseCase>(TYPES.UpdateInventoryUseCase)
  .to(UpdateInventoryUseCase);

container
  .bind<CreateUserUseCase>(TYPES.CreateUserUseCase)
  .to(CreateUserUseCase);
container.bind<GetUserUseCase>(TYPES.GetUserUseCase).to(GetUserUseCase);
container
  .bind<GetAllUserUseCase>(TYPES.GetAllUsersUseCase)
  .to(GetAllUserUseCase);
container
  .bind<DeleteUserUseCase>(TYPES.DeleteUserUseCase)
  .to(DeleteUserUseCase);
container
  .bind<UpdateUserUseCase>(TYPES.UpdateUserUseCase)
  .to(UpdateUserUseCase);
container.bind<LoginUserUseCase>(TYPES.LoginUserUseCase).to(LoginUserUseCase);
container
  .bind<CheckLoginUserUseCase>(TYPES.CheckLoginUserUseCase)
  .to(CheckLoginUserUseCase);

container
  .bind<CreateRoleUseCase>(TYPES.CreateRoleUseCase)
  .to(CreateRoleUseCase);
container.bind<GetRoleUseCase>(TYPES.GetRoleUseCase).to(GetRoleUseCase);
container
  .bind<GetAllRolesUseCase>(TYPES.GetAllRolesUseCase)
  .to(GetAllRolesUseCase);
container
  .bind<DeleteRoleUseCase>(TYPES.DeleteRoleUseCase)
  .to(DeleteRoleUseCase);
container
  .bind<UpdateRoleUseCase>(TYPES.UpdateRoleUseCase)
  .to(UpdateRoleUseCase);
container
  .bind<GetAllActivitiesUseCase>(TYPES.GetAllActivitiesUseCase)
  .to(GetAllActivitiesUseCase);

export { container };
