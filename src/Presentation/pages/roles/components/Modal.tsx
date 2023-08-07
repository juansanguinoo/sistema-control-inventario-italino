import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { RoleModel } from "../../../../domain/models/RoleModel";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { RootState } from "../../../../store/store";
import {
  createRole,
  getAllActivities,
  updateRole,
} from "../../../../store/actions/roleActions";
import Swal from "sweetalert2";
import { ActivityModel } from "../../../../domain/models/ActivitiesModel";

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
    id: initialState?.id || 0,
    nameRole: initialState?.nameRole || "",
    descriptionRole: initialState?.descriptionRole || "",
    statusRole: initialState?.statusRole || "Inactivo",
    activities: initialState?.activities || [],
  });
  const dispatch = useDispatch<Dispatch<any>>(); // eslint-disable-line
  const [activitiesToShow, setActivitiesToShow] = useState<ActivityModel[]>([]);
  const activities = useSelector(
    (state: RootState) => state.roleReducer.activities
  );

  useEffect(() => {
    dispatch(getAllActivities());
  }, [dispatch]);

  useEffect(() => {
    setActivitiesToShow(activities.filter((activity) => activity.id !== 6));
  }, [activities]);

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    setRoleData((prevData: RoleModel) => ({
      ...prevData,
      statusRole: checked ? "Activo" : "Inactivo",
    }));
  };

  const handleActivityCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { checked, value } = e.target;
    let updatedActivities: number[];
    if (checked) {
      updatedActivities = [...roleData.activities, Number(value)];
    } else {
      updatedActivities = roleData.activities.filter(
        (idActivity: number) => idActivity !== Number(value)
      );
    }

    setRoleData((prevData: RoleModel) => ({
      ...prevData,
      activities: updatedActivities,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (roleData.nameRole === "" || roleData.descriptionRole === "") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Por favor completa todos los campos",
      });
    } else if (roleData.activities.length === 0) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Por favor selecciona al menos una actividad",
      });
    } else {
      if (action === "edit") {
        dispatch(updateRole(roleData.id!, roleData));
      } else {
        dispatch(createRole(roleData));
      }
      Swal.fire("Buen trabajo!", "Rol creado correctamente!", "success");
      onCloseModal && onCloseModal();
    }
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
                {activitiesToShow.map((activity) => (
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
                      checked={roleData.activities.includes(activity.id)}
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
                checked={roleData.statusRole === "Activo"}
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
              {action === "preview" ? null : (
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
