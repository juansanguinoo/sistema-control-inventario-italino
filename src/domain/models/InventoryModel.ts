export interface InventoryModel {
  idInventory?: number;
  referenceInventory: string;
  nameInventory: string;
  descriptionInventory?: string;
  stockInventory: number;
  statusInventory: string;
  sellingPriceInventory: number;
  costPriceInventory: number;
  imageInventory?: string;
  publicatedInventory: string;
  createdAt?: string;
  updatedAt?: string;
  category: number;
}
