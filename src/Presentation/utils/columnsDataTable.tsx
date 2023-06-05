export const categoryColumns = [
  {
    field: "nameCategory",
    headerName: "Nombre de la categoría",
    width: 270,
  },
  {
    field: "referenceCategory",
    headerName: "Referencia de la categoría",
    width: 270,
  },
  {
    field: "descriptionCategory",
    headerName: "Descripción de la categoría",
    width: 270,
  },
  {
    field: "statusCategory",
    headerName: "Status",
    width: 200,
    renderCell: (params: any) => {
      return (
        <div
          className={`cellWithStatus ${params.row.statusCategory.toLowerCase()}`}
        >
          {params.row.statusCategory}
        </div>
      );
    },
  },
];

export const userColumns = [
  {
    field: "nameUser",
    headerName: "Nombre del usuario",
    width: 270,
  },
  {
    field: "emailUser",
    headerName: "Correo electrónico del usuario",
    width: 270,
  },
  {
    field: "phoneUser",
    headerName: "Teléfono del usuario",
    width: 270,
  },
  {
    field: "role",
    headerName: "Rol del usuario",
    width: 270,
    renderCell: (params: any) => {
      return <div>{params.row.rol.name_role}</div>;
    },
  },
  {
    field: "statusUser",
    headerName: "Status",
    width: 200,
    renderCell: (params: any) => {
      return (
        <div
          className={`cellWithStatus ${params.row.statusUser.toLowerCase()}`}
        >
          {params.row.statusUser}
        </div>
      );
    },
  },
];

export const roleColumns = [
  {
    field: "nameRole",
    headerName: "Nombre del rol",
    width: 270,
  },
  {
    field: "Dashboard",
    headerName: "Dashboard",
    width: 140,
    renderCell: (params: any) => {
      return (
        <div
          className={`cellWithStatus ${
            params.row.activities.find(
              (activity: any) => activity.name_activity === "Dashboard"
            )
              ? "active"
              : "inactive"
          }`}
        >
          {params.row.activities.find(
            (activity: any) => activity.name_activity === "Dashboard"
          ) ? (
            <div>Con acceso</div>
          ) : (
            <div>Sin acceso</div>
          )}
        </div>
      );
    },
  },
  {
    field: "Ordenes",
    headerName: "Ordenes",
    width: 140,
    renderCell: (params: any) => {
      return (
        <div
          className={`cellWithStatus ${
            params.row.activities.find(
              (activity: any) => activity.name_activity === "Ordenes"
            )
              ? "active"
              : "inactive"
          }`}
        >
          {params.row.activities.find(
            (activity: any) => activity.name_activity === "Ordenes"
          ) ? (
            <div>Con acceso</div>
          ) : (
            <div>Sin acceso</div>
          )}
        </div>
      );
    },
  },
  {
    field: "Clientes",
    headerName: "Clientes",
    width: 140,
    renderCell: (params: any) => {
      return (
        <div
          className={`cellWithStatus ${
            params.row.activities.find(
              (activity: any) => activity.name_activity === "Clientes"
            )
              ? "active"
              : "inactive"
          }`}
        >
          {params.row.activities.find(
            (activity: any) => activity.name_activity === "Clientes"
          ) ? (
            <div>Con acceso</div>
          ) : (
            <div>Sin acceso</div>
          )}
        </div>
      );
    },
  },
  {
    field: "Productos",
    headerName: "Productos",
    width: 140,
    renderCell: (params: any) => {
      return (
        <div
          className={`cellWithStatus ${
            params.row.activities.find(
              (activity: any) => activity.name_activity === "Productos"
            )
              ? "active"
              : "inactive"
          }`}
        >
          {params.row.activities.find(
            (activity: any) => activity.name_activity === "Productos"
          ) ? (
            <div>Con acceso</div>
          ) : (
            <div>Sin acceso</div>
          )}
        </div>
      );
    },
  },
  {
    field: "Categorías",
    headerName: "Categorías",
    width: 140,
    renderCell: (params: any) => {
      return (
        <div
          className={`cellWithStatus ${
            params.row.activities.find(
              (activity: any) => activity.name_activity === "Categorías"
            )
              ? "active"
              : "inactive"
          }`}
        >
          {params.row.activities.find(
            (activity: any) => activity.name_activity === "Categorías"
          ) ? (
            <div>Con acceso</div>
          ) : (
            <div>Sin acceso</div>
          )}
        </div>
      );
    },
  },
  {
    field: "statusRole",
    headerName: "Status",
    width: 200,
    renderCell: (params: any) => {
      return (
        <div
          className={`cellWithStatus ${params.row.statusRole.toLowerCase()}`}
        >
          {params.row.statusRole}
        </div>
      );
    },
  },
];
