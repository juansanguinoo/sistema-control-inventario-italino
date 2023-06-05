import { combineReducers } from "redux";
import { categoryReducer } from "./categoryReducer";
import { navbarReducer } from "./navbarReducer";
import { userReducer } from "./userReducer";
import { roleReducer } from "./roleReducer";

export default combineReducers({
  categoryReducer,
  navbarReducer,
  userReducer,
  roleReducer,
});
