import { NavbarAction } from "../actions/navbarActions";
import { NavbarActionTypes } from "../enums/NavbarActionsEnum";

export interface NavbarState {
  stateOpen: boolean;
  selectedNavItem: string;
}

const initialState: NavbarState = {
  stateOpen: true,
  selectedNavItem: "/",
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
    default:
      return state;
  }
};
