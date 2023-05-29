import axios, { AxiosInstance, AxiosResponse } from "axios";
import { inject, injectable } from "inversify";
import { IHttpClient } from "./interfaces/IHttpClient";
import { TYPES } from "../../config/types";

@injectable()
export class AxiosHttpClient implements IHttpClient {
  private instance: AxiosInstance;

  constructor(@inject(TYPES.BaseUrl) baseUrl: string) {
    this.instance = axios.create({ baseURL: baseUrl });
  }

  async get<T>(url: string): Promise<T> {
    const response: AxiosResponse<T> = await this.instance.get(url);
    return response.data;
  }

  async post<T>(url: string, data: any): Promise<T> {
    const response: AxiosResponse<T> = await this.instance.post(url, data);
    return response.data;
  }

  async put(url: string, data: any): Promise<boolean> {
    const response: AxiosResponse<boolean> = await this.instance.put(url, data);
    return response.data;
  }

  async delete(url: string): Promise<boolean> {
    const response: AxiosResponse<boolean> = await this.instance.delete(url);
    return response.data;
  }
}
