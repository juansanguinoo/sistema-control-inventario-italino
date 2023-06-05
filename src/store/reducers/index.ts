import { combineReducers } from "redux";
import { categoryReducer } from "./categoryReducer";
import { navbarReducer } from "./navbarReducer";
import { inventoryReducer } from "./inventoryReducer";
import { userReducer } from "./userReducer";
import { roleReducer } from "./roleReducer";

export default combineReducers({
  categoryReducer,
  navbarReducer,
  inventoryReducer,
  userReducer,
  roleReducer,
});
