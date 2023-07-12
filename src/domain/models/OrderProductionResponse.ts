export interface OrderProductionResponse {
  id_order: number;
  reference_order: string;
  status_order: string;
  payment_order: string;
  type_order: string;
  total_order: number;
  created_at: string;
  order_details: any;
}
