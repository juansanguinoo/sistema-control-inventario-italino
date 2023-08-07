import { Activity } from "../../domain/models/Activities";
import { ActivityModel } from "../../domain/models/ActivitiesModel";
import { Role } from "../../domain/models/Role";
import { RoleModel } from "../../domain/models/RoleModel";

export const adaptRole = (role: Role): RoleModel => {
  return {
    id: role.id_role,
    nameRole: role.name_role,
    descriptionRole: role.description_role,
    statusRole: role.status_role,
    createdAt: role.created_at,
    updatedAt: role.updated_at,
    activities: role.activities,
  };
};

export const adaptRoles = (roles: Role[]): RoleModel[] => {
  return roles.map((role) => adaptRole(role));
};

export const adaptActivity = (activity: Activity): ActivityModel => {
  return {
    id: activity.id_activity,
    nameActivity: activity.name_activity,
    descriptionActivity: activity.description_activity,
    statusActivity: activity.status_activity,
    createdAt: activity.created_at,
    updatedAt: activity.updated_at,
    roles: activity.roles,
  };
};

export const adaptActivities = (activities: Activity[]): ActivityModel[] => {
  return activities.map((activity) => adaptActivity(activity));
};
