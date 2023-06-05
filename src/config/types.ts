const TYPES = {
  HttpClient: Symbol.for("HttpClient"),
  BaseUrl: Symbol.for("BaseUrl"),

  ICategoryRepository: Symbol.for("ICategoryRepository"),
  IUserRepository: Symbol.for("IUserRepository"),
  IRoleRepository: Symbol.for("IRoleRepository"),

  CreateCategoryUseCase: Symbol.for("CreateCategoryUseCase"),
  GetCategoriesUseCase: Symbol.for("GetCategoriesUseCase"),
  DeleteCategoryUseCase: Symbol.for("DeleteCategoryUseCase"),
  UpdateCategoryUseCase: Symbol.for("UpdateCategoryUseCase"),

  CreateUserUseCase: Symbol.for("CreateUserUseCase"),
  GetAllUsersUseCase: Symbol.for("GetAllUsersUseCase"),
  GetUserUseCase: Symbol.for("GetUserUseCase"),
  UpdateUserUseCase: Symbol.for("UpdateUserUseCase"),
  DeleteUserUseCase: Symbol.for("DeleteUserUseCase"),

  CreateRoleUseCase: Symbol.for("CreateRoleUseCase"),
  GetAllRolesUseCase: Symbol.for("GetAllRolesUseCase"),
  GetRoleUseCase: Symbol.for("GetRoleUseCase"),
  UpdateRoleUseCase: Symbol.for("UpdateRoleUseCase"),
  DeleteRoleUseCase: Symbol.for("DeleteRoleUseCase"),
  GetAllActivitiesUseCase: Symbol.for("GetAllActivitiesUseCase"),
};

export { TYPES };
