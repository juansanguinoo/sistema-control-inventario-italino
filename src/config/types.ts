const TYPES = {
  HttpClient: Symbol.for("HttpClient"),
  BaseUrl: Symbol.for("BaseUrl"),

  ICategoryRepository: Symbol.for("ICategoryRepository"),
  IInventoryRepository: Symbol.for("IInventoryRepository"),

  CreateCategoryUseCase: Symbol.for("CreateCategoryUseCase"),
  GetCategoriesUseCase: Symbol.for("GetCategoriesUseCase"),
  DeleteCategoryUseCase: Symbol.for("DeleteCategoryUseCase"),
  UpdateCategoryUseCase: Symbol.for("UpdateCategoryUseCase"),

  CreateInventoryUseCase: Symbol.for("CreateInventoryUseCase"),
  GetInventoriesUseCase: Symbol.for("GetInventoriesUseCase"),
  DeleteInventoryUseCase: Symbol.for("DeleteInventoryUseCase"),
  UpdateInventoryUseCase: Symbol.for("UpdateInventoryUseCase"),
};

export { TYPES };
