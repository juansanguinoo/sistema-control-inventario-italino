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
      return <div>{params.row.roleId.name_role}</div>;
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
              ? "access"
              : "noaccess"
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
              ? "access"
              : "noaccess"
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
              ? "access"
              : "noaccess"
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
              ? "access"
              : "noaccess"
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
              ? "access"
              : "noaccess"
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

export const inventoryColumns = [
  {
    field: "imageInventory",
    headerName: "Imagén",
    width: 100,
    renderCell: (params: any) => {
      return (
        <div className="cellWithImage">
          {params.row.imageInventory.split(",")[0] === "" ? (
            <img src={params.row.imageInventory} alt="" />
          ) : (
            <img src={params.row.imageInventory.split(",")[0]} alt="" />
          )}
        </div>
      );
    },
  },
  {
    field: "nameInventory",
    headerName: "Nombre",
    width: 200,
  },
  {
    field: "referenceInventory",
    headerName: "Referencia",
    width: 100,
  },
  {
    field: "categoryInventory",
    headerName: "Categoría",
    width: 150,
  },
  {
    field: "costPriceInventory",
    headerName: "Costo",
    width: 100,
  },
  {
    field: "stockInventory",
    headerName: "Stock",
    width: 100,
  },
  {
    field: "statusInventory",
    headerName: "Status",
    width: 150,
    renderCell: (params: any) => {
      return (
        <div
          className={`cellWithStatus ${params.row.statusInventory.toLowerCase()}`}
        >
          {params.row.statusInventory}
        </div>
      );
    },
  },
  {
    field: "publicatedInventory",
    headerName: "Publicado",
    width: 150,
    renderCell: (params: any) => {
      return (
        <div
          className={`cellWithStatus ${
            params.row.publicatedInventory ? "active" : "inactive"
          }`}
        >
          {params.row.publicatedInventory ? "Publicado" : "No publicado"}
        </div>
      );
    },
  },
];

export const customerColumns = [
  {
    field: "nameCustomer",
    headerName: "Nombre",
    width: 200,
  },
  {
    field: "nitCustomer",
    headerName: "NIT o cédula",
    width: 200,
  },
  {
    field: "addressCustomer",
    headerName: "Dirección",
    width: 300,
  },
  {
    field: "phoneCustomer",
    headerName: "Teléfono",
    width: 200,
  },
  {
    field: "statusCustomer",
    headerName: "Estado",
    width: 200,
    renderCell: (params: any) => {
      return (
        <div
          className={`cellWithStatus ${params.row.statusCustomer.toLowerCase()}`}
        >
          {params.row.statusCustomer}
        </div>
      );
    },
  },
];
