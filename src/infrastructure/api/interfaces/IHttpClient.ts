export interface IHttpClient {
  get<T>(url: string): Promise<T>;
  post<T>(url: string, data: any): Promise<T>;
  put(url: string, data: any): Promise<boolean>;
  delete(url: string): Promise<boolean>;
}
