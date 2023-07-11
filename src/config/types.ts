const TYPES = {
  HttpClient: Symbol.for("HttpClient"),
  BaseUrl: Symbol.for("BaseUrl"),

  ICategoryRepository: Symbol.for("ICategoryRepository"),
  IInventoryRepository: Symbol.for("IInventoryRepository"),
  IUserRepository: Symbol.for("IUserRepository"),
  IRoleRepository: Symbol.for("IRoleRepository"),
  ICustomerRepository: Symbol.for("ICustomerRepository"),
  IOrderRepository: Symbol.for("IOrderRepository"),

  CreateCategoryUseCase: Symbol.for("CreateCategoryUseCase"),
  GetCategoriesUseCase: Symbol.for("GetCategoriesUseCase"),
  DeleteCategoryUseCase: Symbol.for("DeleteCategoryUseCase"),
  UpdateCategoryUseCase: Symbol.for("UpdateCategoryUseCase"),

  CreateInventoryUseCase: Symbol.for("CreateInventoryUseCase"),
  GetInventoriesUseCase: Symbol.for("GetInventoriesUseCase"),
  DeleteInventoryUseCase: Symbol.for("DeleteInventoryUseCase"),
  UpdateInventoryUseCase: Symbol.for("UpdateInventoryUseCase"),
  AddInventoryUseCase: Symbol.for("AddInventoryUseCase"),
  GetInventoryByNameOrReferenceUseCase: Symbol.for(
    "GetInventoryByNameOrReferenceUseCase"
  ),
  GetInventoryToReportUseCase: Symbol.for("GetInventoryToReportUseCase"),
  GetInventoriesByCategoryIdUseCase: Symbol.for(
    "GetInventoriesByCategoryIdUseCase"
  ),
  GetInventoryInfoUseCase: Symbol.for("GetInventoryInfoUseCase"),

  CreateUserUseCase: Symbol.for("CreateUserUseCase"),
  GetAllUsersUseCase: Symbol.for("GetAllUsersUseCase"),
  GetUserUseCase: Symbol.for("GetUserUseCase"),
  UpdateUserUseCase: Symbol.for("UpdateUserUseCase"),
  DeleteUserUseCase: Symbol.for("DeleteUserUseCase"),
  LoginUserUseCase: Symbol.for("LoginUserUseCase"),
  CheckLoginUserUseCase: Symbol.for("CheckLoginUserUseCase"),
  UpdatePasswordUseCase: Symbol.for("UpdatePasswordUseCase"),

  CreateRoleUseCase: Symbol.for("CreateRoleUseCase"),
  GetAllRolesUseCase: Symbol.for("GetAllRolesUseCase"),
  GetRoleUseCase: Symbol.for("GetRoleUseCase"),
  UpdateRoleUseCase: Symbol.for("UpdateRoleUseCase"),
  DeleteRoleUseCase: Symbol.for("DeleteRoleUseCase"),
  GetAllActivitiesUseCase: Symbol.for("GetAllActivitiesUseCase"),

  CreateCustomerUseCase: Symbol.for("CreateCustomerUseCase"),
  GetAllCustomerUseCase: Symbol.for("GetAllCustomersUseCase"),
  GetCustomerUseCase: Symbol.for("GetCustomerUseCase"),
  UpdateCustomerUseCase: Symbol.for("UpdateCustomerUseCase"),
  DeleteCustomerUseCase: Symbol.for("DeleteCustomerUseCase"),
  GetCustomerByUserIdUseCase: Symbol.for("GetCustomerByUserIdUseCase"),
  GetCustomersByNameOrNitUseCase: Symbol.for("GetCustomersByNameOrNitUseCase"),
  GetCustomerInfoUseCase: Symbol.for("GetCustomerInfoUseCase"),

  CreateOrderUseCase: Symbol.for("CreateOrderUseCase"),
  GetAllOrdersUseCase: Symbol.for("GetAllOrdersUseCase"),
  GetOrderByUserIdUseCase: Symbol.for("GetOrderByUserIdUseCase"),
  GetOrderByIdUseCase: Symbol.for("GetOrderByIdUseCase"),
  UpdateOrderUseCase: Symbol.for("UpdateOrderUseCase"),
  CreateOrderReturnUseCase: Symbol.for("CreateOrderReturnUseCase"),
  GetOrderAndReturnByIdUseCase: Symbol.for("GetOrderAndReturnByIdUseCase"),
  GetOrderByReferenceUseCase: Symbol.for("GetOrderByReferenceUseCase"),
  GetOrderStatsUseCase: Symbol.for("GetOrderStatsUseCase"),
  GetOrdersProductionUseCase: Symbol.for("GetOrdersProductionUseCase"),
};

export { TYPES };
