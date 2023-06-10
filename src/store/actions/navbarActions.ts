import { Dispatch } from "redux";
import { NavbarActionTypes } from "../enums/NavbarActionsEnum";
import {
  handleNavbarAction,
  selectedNavItemAction,
} from "../interfaces/navbarActionsInterface";

export type NavbarAction = handleNavbarAction | selectedNavItemAction;

export const handleNavbar = (stateOpen: boolean) => {
  return async (dispatch: Dispatch) => {
    dispatch({
      type: NavbarActionTypes.HANDLE_NAVBAR,
      payload: stateOpen,
    });
  };
};

export const selectedNavItem = (selectedNavItem: string) => {
  return async (dispatch: Dispatch) => {
    localStorage.setItem("selectedNavItem", selectedNavItem);
    dispatch({
      type: NavbarActionTypes.SELECTED_ITEM,
      payload: selectedNavItem,
    });
  };
};
