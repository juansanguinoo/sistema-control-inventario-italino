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
import { ICustomerRepository } from "../domain/repositories/ICustomerRepository";
import { CustomerRepositoryImpl } from "../infrastructure/repositories/CustomerRepositoryImpl";
import { CreateCustomerUseCase } from "../domain/useCases/customer/CreateCustomerUseCase";
import { GetCustomerUseCase } from "../domain/useCases/customer/GetCustomerUseCase";
import { GetAllCustomerUseCase } from "../domain/useCases/customer/GetAllCustomerUseCase";
import { DeleteCustomerUseCase } from "../domain/useCases/customer/DeleteCustomerUseCase";
import { UpdateCustomerUseCase } from "../domain/useCases/customer/UpdateCustomerUseCase";
import { GetCustomerByUserIdUseCase } from "../domain/useCases/customer/GetCustomerByUserIdUseCase";
import { LoginUserUseCase } from "../domain/useCases/user/LoginUserUseCase";
import { CheckLoginUserUseCase } from "../domain/useCases/user/CheckLoginUserUseCase";
import { IOrderRepository } from "../domain/repositories/IOrderRepository";
import { OrderRepositoryImpl } from "../infrastructure/repositories/OrderRepositoryImpl";
import { CreateOrderUseCase } from "../domain/useCases/order/CreateOrderUseCase";
import { GetAllOrdersUseCase } from "../domain/useCases/order/GetAllOrdersUseCase";
import { GetOrderByUserIdUseCase } from "../domain/useCases/order/GetOrderByUserIdUseCase";
import { GetOrderByIdUseCase } from "../domain/useCases/order/GetOrderByIdUseCase";
import { UpdateOrderUseCase } from "../domain/useCases/order/UpdateOrderUseCase";
import { CreateOrderReturnUseCase } from "../domain/useCases/order/CreateOrderReturnUseCase";
import { AddInventoryUseCase } from "../domain/useCases/inventory/AddInventoryUseCase";
import { GetInventoryByNameOrReferenceUseCase } from "../domain/useCases/inventory/GetInventoryByNameOrReference";
import { GetInventoryToReportUseCase } from "../domain/useCases/inventory/GetInventoryToReport";
import { GetOrderAndReturnByIdUseCase } from "../domain/useCases/order/getOrderAndReturnByIdUseCase";
import { GetOrderByReferenceUseCase } from "../domain/useCases/order/getOrderByReferenceUseCase";
import { GetCustomersByNameOrNitUseCase } from "../domain/useCases/customer/GetCustomersByNameOrNit";
import { GetInventoriesByCategoryIdUseCase } from "../domain/useCases/inventory/getInventoriesByCategoryIdUseCase";
import { GetInventoryInfoUseCase } from "../domain/useCases/inventory/GetInventoryInfoUseCase";
import { GetCustomerInfoUseCase } from "../domain/useCases/customer/GetCustomerInfoUseCase";
import { GetOrderStatsUseCase } from "../domain/useCases/order/GetOrderStatsUseCase";
import { GetOrdersProductionUseCase } from "../domain/useCases/order/GetOrderProductionUseCase";
import { UpdatePasswordUseCase } from "../domain/useCases/user/UpdatePasswordUseCase";
import { ForgotPasswordUseCase } from "../domain/useCases/user/ForgotPasswordUseCase";
import { ResetPasswordUseCase } from "../domain/useCases/user/ResetPasswordUseCase";

const container = new Container();

// HttpClient
container.bind<IHttpClient>(TYPES.HttpClient).to(AxiosHttpClient);

// BaseUrl
container
  .bind<string>(TYPES.BaseUrl)
  .toConstantValue(import.meta.env.VITE_BACKEND_URL);

// Repositories
container
  .bind<ICategoryRepository>(TYPES.ICategoryRepository)
  .to(CategoryRepositoryImpl);
container.bind<IUserRepository>(TYPES.IUserRepository).to(UserRepositoryImpl);
container.bind<IRoleRepository>(TYPES.IRoleRepository).to(RoleRepositoryImpl);
container
  .bind<IInventoryRepository>(TYPES.IInventoryRepository)
  .to(InventoryRepositoryImpl);
container
  .bind<ICustomerRepository>(TYPES.ICustomerRepository)
  .to(CustomerRepositoryImpl);
container
  .bind<IOrderRepository>(TYPES.IOrderRepository)
  .to(OrderRepositoryImpl);

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
  .bind<AddInventoryUseCase>(TYPES.AddInventoryUseCase)
  .to(AddInventoryUseCase);
container
  .bind<GetInventoryByNameOrReferenceUseCase>(
    TYPES.GetInventoryByNameOrReferenceUseCase
  )
  .to(GetInventoryByNameOrReferenceUseCase);
container
  .bind<GetInventoryToReportUseCase>(TYPES.GetInventoryToReportUseCase)
  .to(GetInventoryToReportUseCase);
container
  .bind<GetInventoriesByCategoryIdUseCase>(
    TYPES.GetInventoriesByCategoryIdUseCase
  )
  .to(GetInventoriesByCategoryIdUseCase);
container
  .bind<GetInventoryInfoUseCase>(TYPES.GetInventoryInfoUseCase)
  .to(GetInventoryInfoUseCase);

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
  .bind<UpdatePasswordUseCase>(TYPES.UpdatePasswordUseCase)
  .to(UpdatePasswordUseCase);
container
  .bind<ForgotPasswordUseCase>(TYPES.ForgotPasswordUseCase)
  .to(ForgotPasswordUseCase);
container
  .bind<ResetPasswordUseCase>(TYPES.ResetPasswordUseCase)
  .to(ResetPasswordUseCase);

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

container
  .bind<CreateCustomerUseCase>(TYPES.CreateCustomerUseCase)
  .to(CreateCustomerUseCase);
container
  .bind<GetCustomerUseCase>(TYPES.GetCustomerUseCase)
  .to(GetCustomerUseCase);
container
  .bind<GetAllCustomerUseCase>(TYPES.GetAllCustomerUseCase)
  .to(GetAllCustomerUseCase);
container
  .bind<DeleteCustomerUseCase>(TYPES.DeleteCustomerUseCase)
  .to(DeleteCustomerUseCase);
container
  .bind<UpdateCustomerUseCase>(TYPES.UpdateCustomerUseCase)
  .to(UpdateCustomerUseCase);
container
  .bind<GetCustomerByUserIdUseCase>(TYPES.GetCustomerByUserIdUseCase)
  .to(GetCustomerByUserIdUseCase);
container
  .bind<GetCustomersByNameOrNitUseCase>(TYPES.GetCustomersByNameOrNitUseCase)
  .to(GetCustomersByNameOrNitUseCase);
container
  .bind<GetCustomerInfoUseCase>(TYPES.GetCustomerInfoUseCase)
  .to(GetCustomerInfoUseCase);

container
  .bind<CreateOrderUseCase>(TYPES.CreateOrderUseCase)
  .to(CreateOrderUseCase);
container
  .bind<GetAllOrdersUseCase>(TYPES.GetAllOrdersUseCase)
  .to(GetAllOrdersUseCase);
container
  .bind<GetOrderByUserIdUseCase>(TYPES.GetOrderByUserIdUseCase)
  .to(GetOrderByUserIdUseCase);
container
  .bind<GetOrderByIdUseCase>(TYPES.GetOrderByIdUseCase)
  .to(GetOrderByIdUseCase);
container
  .bind<UpdateOrderUseCase>(TYPES.UpdateOrderUseCase)
  .to(UpdateOrderUseCase);
container
  .bind<CreateOrderReturnUseCase>(TYPES.CreateOrderReturnUseCase)
  .to(CreateOrderReturnUseCase);
container
  .bind<GetOrderAndReturnByIdUseCase>(TYPES.GetOrderAndReturnByIdUseCase)
  .to(GetOrderAndReturnByIdUseCase);
container
  .bind<GetOrderByReferenceUseCase>(TYPES.GetOrderByReferenceUseCase)
  .to(GetOrderByReferenceUseCase);
container
  .bind<GetOrderStatsUseCase>(TYPES.GetOrderStatsUseCase)
  .to(GetOrderStatsUseCase);
container
  .bind<GetOrdersProductionUseCase>(TYPES.GetOrdersProductionUseCase)
  .to(GetOrdersProductionUseCase);

export { container };
