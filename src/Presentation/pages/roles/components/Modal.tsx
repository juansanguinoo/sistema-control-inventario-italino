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
    onCloseModal && onCloseModal();
  };

  return (
    <div>
      <div className="modal-rol">
        <div className="modal-rol-content">
          <div className="modal-rol-header">
            <h4>Agregar Rol</h4>
            <span className="close" onClick={onCloseModal}>
              &times;
            </span>
          </div>
          <p className="form-modal-detail-rol">Detalles del rol</p>
          <form className="form-modal-rol" onSubmit={handleSubmit}>
            <div className="form-group-rol">
              <input
                type="text"
                id="rolName"
                placeholder="Nombre del rol"
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
            <div className="form-group-rol">
              <textarea
                name="descriptionRol"
                id="descriptionRol"
                placeholder="Descripción del rol"
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
            <div className="form-group-rol">
              <label className="activities-rol-label">Actividades:</label>
              <div className="activity-checkboxes">
                {activities.map((activity) => (
                  <div key={activity.id} className="activity-checkbox">
                    <label
                      htmlFor={`activity-${activity.id}`}
                      className="activities-rol"
                    >
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
              <label
                htmlFor="btn-switch-active-category"
                className="form-modal-rol-status-label"
              >
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
            <div className="modal-rol-footer">
              <button
                type="button"
                className="cancel-rol-button"
                onClick={onCloseModal}
              >
                Cancelar
              </button>
              {action === "watch" ? null : (
                <button type="submit" className="add-rol-button">
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
