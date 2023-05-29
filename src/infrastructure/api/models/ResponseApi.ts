export interface ResponseAPI<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}
