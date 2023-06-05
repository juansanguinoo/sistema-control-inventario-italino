import { combineReducers } from "redux";
import { categoryReducer } from "./categoryReducer";
import { navbarReducer } from "./navbarReducer";
import { inventoryReducer } from "./inventoryReducer";

export default combineReducers({
  categoryReducer,
  navbarReducer,
  inventoryReducer,
});
