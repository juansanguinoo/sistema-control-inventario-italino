import axios, { AxiosInstance, AxiosResponse } from "axios";
import { inject, injectable } from "inversify";
import { IHttpClient } from "./interfaces/IHttpClient";
import { TYPES } from "../../config/types";

@injectable()
export class AxiosHttpClient implements IHttpClient {
  private instance: AxiosInstance;

  constructor(@inject(TYPES.BaseUrl) baseUrl: string) {
    this.instance = axios.create({ baseURL: baseUrl });

    const token = sessionStorage.getItem("token");
    if (token) {
      console.log("token", token);
      this.instance.defaults.headers.common["x-token"] = token;
    }
  }

  async get<T>(url: string): Promise<T> {
    const response: AxiosResponse<T> = await this.instance.get(url);
    return response.data;
  }

  async post<T, U>(url: string, data: U): Promise<T> {
    const response: AxiosResponse<T> = await this.instance.post(url, data);
    return response.data;
  }

  async put<T, U>(url: string, data: U): Promise<T> {
    const response: AxiosResponse<T> = await this.instance.put(url, data);
    return response.data;
  }

  async delete<T>(url: string): Promise<T> {
    const response: AxiosResponse<T> = await this.instance.delete(url);
    return response.data;
  }
}
