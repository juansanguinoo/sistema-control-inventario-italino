import { Dispatch } from "redux";
import { NavbarActionTypes } from "../enums/NavbarActionsEnum";
import {
  handleNavbarAction,
  isMobileClickedAction,
  selectedNavItemAction,
} from "../interfaces/navbarActionsInterface";

export type NavbarAction =
  | handleNavbarAction
  | selectedNavItemAction
  | isMobileClickedAction;

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
    sessionStorage.setItem("selectedNavItem", selectedNavItem);
    dispatch({
      type: NavbarActionTypes.SELECTED_ITEM,
      payload: selectedNavItem,
    });
  };
};

export const handleMobileClicked = (isMobileClicked: boolean) => {
  return async (dispatch: Dispatch) => {
    dispatch({
      type: NavbarActionTypes.IS_MOBILE_CLICKED,
      payload: isMobileClicked,
    });
  };
};
