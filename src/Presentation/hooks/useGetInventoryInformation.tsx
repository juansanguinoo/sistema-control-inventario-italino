import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { getInventory } from "../../store/actions/inventoryActions";
import { RootState } from "../../store/store";
import { InventoryModel } from "../../domain/models/InventoryModel";

export const useGetInventoryInformation = () => {
  const dispatch = useDispatch<Dispatch<any>>(); // eslint-disable-line

  useEffect(() => {
    dispatch(getInventory());
  }, [dispatch]);

  const inventories: InventoryModel[] = useSelector(
    (state: RootState) => state.inventoryReducer.inventories
  );

  // get the active products
  const activeProducts = inventories.filter(
    (inventory) => inventory.statusInventory === "Activo"
  );

  // get inactive products
  const inactiveProducts = inventories.filter(
    (inventory) => inventory.statusInventory === "Inactivo"
  );

  // get the pubicated products
  const publishedProducts = inventories.filter(
    (inventory) => inventory.publicatedInventory === true
  );

  // get the total stock
  const totalStock = inventories.reduce(
    (total, inventory) => total + inventory.stockInventory,
    0
  );

  return {
    activeProducts,
    inactiveProducts,
    publishedProducts,
    totalStock,
  };
};
