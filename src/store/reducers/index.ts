import { combineReducers } from "redux";
import { categoryReducer } from "./categoryReducer";
import { navbarReducer } from "./navbarReducer";
import { inventoryReducer } from "./inventoryReducer";
import { userReducer } from "./userReducer";
import { roleReducer } from "./roleReducer";
import { customerReducer } from "./customerReducer";
import { orderReducer } from "./orderReducer";

export default combineReducers({
  categoryReducer,
  navbarReducer,
  inventoryReducer,
  userReducer,
  roleReducer,
  customerReducer,
  orderReducer,
});
