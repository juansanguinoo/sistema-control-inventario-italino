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

export { container };
