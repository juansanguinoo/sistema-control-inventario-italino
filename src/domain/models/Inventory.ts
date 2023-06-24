export interface Inventory {
  id_inventory?: number;
  reference_inventory: string;
  name_inventory: string;
  description_inventory: string;
  stock_inventory: number;
  status_inventory: string;
  selling_price_inventory: number;
  cost_price_inventory: number;
  image_inventory?: string;
  publicated_inventory: boolean;
  created_at?: string;
  updated_at?: string;
  category: number;
  add_inventory: any;
}
