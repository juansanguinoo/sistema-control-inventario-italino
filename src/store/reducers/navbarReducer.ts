import { NavbarAction } from "../actions/navbarActions";
import { NavbarActionTypes } from "../enums/NavbarActionsEnum";

export interface NavbarState {
  stateOpen: boolean;
  selectedNavItem: string;
  isMobileClicked?: boolean;
}

const initialState: NavbarState = {
  stateOpen: true,
  selectedNavItem: "/",
  isMobileClicked: false,
};

export const navbarReducer = (
  state = initialState,
  action: NavbarAction
): NavbarState => {
  switch (action.type) {
    case NavbarActionTypes.HANDLE_NAVBAR:
      return {
        ...state,
        stateOpen: action.payload,
      };
    case NavbarActionTypes.SELECTED_ITEM:
      return {
        ...state,
        selectedNavItem: action.payload,
      };
    case NavbarActionTypes.IS_MOBILE_CLICKED:
      return {
        ...state,
        isMobileClicked: action.payload,
      };
    default:
      return state;
  }
};
