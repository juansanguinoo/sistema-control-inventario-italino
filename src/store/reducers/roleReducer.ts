import { ActivityModel } from "../../domain/models/ActivitiesModel";
import { RoleModel } from "../../domain/models/RoleModel";
import { RoleAction } from "../actions/roleActions";
import { RoleActionType } from "../enums/RoleActionsEnum";

export interface RoleState {
  loading: boolean;
  roles: RoleModel[] | [];
  activities: ActivityModel[] | [];
  error: Error | null;
}

const initialState: RoleState = {
  loading: false,
  roles: [],
  activities: [],
  error: null,
};

export const roleReducer = (
  state: RoleState = initialState,
  action: RoleAction
): RoleState => {
  switch (action.type) {
    case RoleActionType.GET_ALL_ROLES:
    case RoleActionType.GET_ROLE:
    case RoleActionType.CREATE_ROLE:
    case RoleActionType.UPDATE_ROLE:
    case RoleActionType.DELETE_ROLE:
    case RoleActionType.GET_ALL_ACTIVITIES:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case RoleActionType.GET_ALL_ROLES_SUCCESS:
      return {
        ...state,
        loading: false,
        roles: action.payload,
        error: null,
      };

    case RoleActionType.GET_ROLE_SUCCESS:
      return {
        ...state,
        loading: false,
        roles: [action.payload],
        error: null,
      };

    case RoleActionType.CREATE_ROLE_SUCCESS:
      return {
        ...state,
        loading: false,
        roles: [...state.roles, action.payload],
        error: null,
      };

    case RoleActionType.UPDATE_ROLE_SUCCESS:
      return {
        ...state,
        loading: false,
        roles: state.roles.map((role) =>
          role.id === action.payload.id ? action.payload : role
        ),
        error: null,
      };

    case RoleActionType.DELETE_ROLE_SUCCESS:
      return {
        ...state,
        loading: false,
        roles: state.roles.filter((role) => role.id !== action.payload),
        error: null,
      };

    case RoleActionType.GET_ALL_ROLES_FAILURE:
    case RoleActionType.GET_ROLE_FAILURE:
    case RoleActionType.CREATE_ROLE_FAILURE:
    case RoleActionType.UPDATE_ROLE_FAILURE:
    case RoleActionType.DELETE_ROLE_FAILURE:
    case RoleActionType.GET_ALL_ACTIVITIES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case RoleActionType.GET_ALL_ACTIVITIES_SUCCESS:
      return {
        ...state,
        loading: false,
        activities: action.payload,
        error: null,
      };

    default:
      return state;
  }
};
