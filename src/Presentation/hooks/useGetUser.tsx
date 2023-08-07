import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

export const useGetUser = () => {
  // const dispatch = useDispatch<Dispatch<any>>(); // eslint-disable-line
  const getUser = useSelector((state: RootState) => state.userReducer.user);
  const loading: boolean = useSelector(
    (state: RootState) => state.userReducer.loading
  );
  return { getUser, loading };
};
