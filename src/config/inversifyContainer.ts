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

export { container };
