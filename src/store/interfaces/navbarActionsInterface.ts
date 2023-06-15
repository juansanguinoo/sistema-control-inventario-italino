import { NavbarActionTypes } from "../enums/NavbarActionsEnum";

export interface handleNavbarAction {
  type: NavbarActionTypes.HANDLE_NAVBAR;
  payload: boolean;
}

export interface selectedNavItemAction {
  type: NavbarActionTypes.SELECTED_ITEM;
  payload: string;
}

export interface isMobileClickedAction {
  type: NavbarActionTypes.IS_MOBILE_CLICKED;
  payload: boolean;
}
