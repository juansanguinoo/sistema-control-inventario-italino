import { Inventory } from "../../domain/models/Inventory";
import { InventoryModel } from "../../domain/models/InventoryModel";

export const adaptInventory = (inventory: Inventory): InventoryModel => {
  return {
    createdAt: inventory.created_at,
    updatedAt: inventory.updated_at,
    id: inventory.id_inventory,
    referenceInventory: inventory.reference_inventory,
    nameInventory: inventory.name_inventory,
    descriptionInventory: inventory.description_inventory,
    stockInventory: inventory.stock_inventory,
    statusInventory: inventory.status_inventory,
    sellingPriceInventory: inventory.selling_price_inventory,
    costPriceInventory: inventory.cost_price_inventory,
    imageInventory: inventory.image_inventory,
    publicatedInventory: inventory.publicated_inventory,
    category: inventory.category,
  };
};

export const adaptInventories = (
  inventories: Inventory[]
): InventoryModel[] => {
  return inventories.map((inventory) => adaptInventory(inventory));
};
