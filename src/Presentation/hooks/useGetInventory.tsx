import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { InventoryModel } from "../../domain/models/InventoryModel";
import { RootState } from "../../store/store";
import { useEffect } from "react";
import { getInventory } from "../../store/actions/inventoryActions";

export const useGetInventory = () => {
  const dispatch = useDispatch<Dispatch<any>>(); // eslint-disable-line

  const inventories: InventoryModel[] = useSelector(
    (state: RootState) => state.inventoryReducer.inventories
  );

  const loading: boolean = useSelector(
    (state: RootState) => state.inventoryReducer.loading
  );

  const error: Error | null = useSelector(
    (state: RootState) => state.inventoryReducer.error
  );

  useEffect(() => {
    dispatch(getInventory());
  }, [dispatch]);

  return { inventories, loading, error };
};
