import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { RootState } from "../../store/store";
import { useEffect } from "react";
import { getInventoryInfo } from "../../store/actions/inventoryActions";

export const useGetInventoryInfo = () => {
  const dispatch = useDispatch<Dispatch<any>>(); // eslint-disable-line
  const inventoryInfo = useSelector(
    (state: RootState) => state.inventoryReducer.inventoryInfo
  );

  useEffect(() => {
    dispatch(getInventoryInfo());
  }, [dispatch]);

  return { inventoryInfo };
};
