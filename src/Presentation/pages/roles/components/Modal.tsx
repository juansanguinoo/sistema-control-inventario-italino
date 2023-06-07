import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { RoleModel } from "../../../../domain/models/RoleModel";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { RootState } from "../../../../store/store";
import {
  createRole,
  getAllActivities,
} from "../../../../store/actions/roleActions";

interface IModalRoleProps {
  onCloseModal?: () => void;
  initialState?: RoleModel;
  action?: string;
}

export const ModalRoles = ({
  onCloseModal,
  initialState,
  action,
}: IModalRoleProps) => {
  const [roleData, setRoleData] = useState<RoleModel>({
    nameRole: initialState?.nameRole || "",
    descriptionRole: initialState?.descriptionRole || "",
    statusRole: initialState?.statusRole || "Inactive",
    activityId: initialState?.activityId || [],
  });
  const dispatch = useDispatch<Dispatch<any>>(); // eslint-disable-line
  const activities = useSelector(
    (state: RootState) => state.roleReducer.activities
  );

  useEffect(() => {
    dispatch(getAllActivities());
  }, [dispatch]);

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    setRoleData((prevData: RoleModel) => ({
      ...prevData,
      statusRole: checked ? "Active" : "Inactive",
    }));
  };

  const handleActivityCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { checked, value } = e.target;
    let updatedActivities: number[];
    if (checked) {
      updatedActivities = [...roleData.activityId, Number(value)];
    } else {
      updatedActivities = roleData.activityId.filter(
        (idActivity: number) => idActivity !== Number(value)
      );
    }

    setRoleData((prevData: RoleModel) => ({
      ...prevData,
      activityId: updatedActivities,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(createRole(roleData));
    console.log(roleData);
    onCloseModal && onCloseModal();
  };

  return (
    <div>
      <div className="modal">
        <div className="modal-content">
          <div className="modal-header">
            <h4>Agregar Rol</h4>
            <span className="close" onClick={onCloseModal}>
              &times;
            </span>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="categoryName">Nombre del rol:</label>
              <input
                type="text"
                id="categoryName"
                required
                value={roleData.nameRole}
                onChange={(event) =>
                  setRoleData((prevData) => ({
                    ...prevData,
                    nameRole: event.target.value,
                  }))
                }
              />
            </div>
            <div className="form-group">
              <label htmlFor="categoryReference">Descripción del rol:</label>
              <textarea
                name=""
                id=""
                required
                value={roleData.descriptionRole}
                onChange={(event) =>
                  setRoleData((prevData) => ({
                    ...prevData,
                    descriptionRole: event.target.value,
                  }))
                }
              ></textarea>
            </div>
            <div className="form-group">
              <label>Actividades:</label>
              <div className="activity-checkboxes">
                {activities.map((activity) => (
                  <div key={activity.id} className="activity-checkbox">
                    <label htmlFor={`activity-${activity.id}`}>
                      {activity.nameActivity}
                    </label>
                    <input
                      type="checkbox"
                      id={`activity-${activity.id}`}
                      value={activity.id}
                      checked={roleData.activityId.includes(activity.id)}
                      onChange={handleActivityCheckboxChange}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="btn-switch-active-category">
                Status del rol:
              </label>
              <input
                type="checkbox"
                id="btn-switch-active-category"
                checked={roleData.statusRole === "Active"}
                onChange={handleCheckboxChange}
              />
              <label
                htmlFor="btn-switch-active-category"
                className="lbl-switch-active-category"
              ></label>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="cancel-button"
                onClick={onCloseModal}
              >
                Cancelar
              </button>
              {action === "watch" ? null : (
                <button type="submit" className="add-button">
                  {action === "edit" ? "Guardar cambios" : "Agregar"}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
