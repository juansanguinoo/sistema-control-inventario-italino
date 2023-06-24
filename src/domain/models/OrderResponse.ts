export interface OrderResponse {
  id_order: number;
  reference_order: string;
  customer: any;
  user: any;
  order_details: any;
  status_order: string;
  payment_order: string;
  type_order: string;
  total_order: number;
  created_at: string;
  order_returns: any;
}
