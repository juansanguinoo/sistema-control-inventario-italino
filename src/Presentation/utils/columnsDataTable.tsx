import moment from "moment";

const moneyFormat = (value: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
};

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
    width: 300,
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
    width: 250,
  },
  {
    field: "emailUser",
    headerName: "Correo electrónico del usuario",
    width: 270,
  },
  {
    field: "phoneUser",
    headerName: "Teléfono del usuario",
    width: 200,
  },
  {
    field: "role",
    headerName: "Rol del usuario",
    width: 200,
    renderCell: (params: any) => {
      return <div>{params.row.roleId.name_role}</div>;
    },
  },
  {
    field: "statusUser",
    headerName: "Status",
    width: 180,
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
    headerName: "Imagen",
    width: 150,
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
    width: 240,
  },
  {
    field: "referenceInventory",
    headerName: "Referencia",
    width: 100,
  },
  {
    field: "categoryInventory",
    headerName: "Categoría",
    width: 170,
    renderCell: (params: any) => {
      return (
        <div className="cellWithStatus">
          {params.row.category?.name_category}
        </div>
      );
    },
  },
  {
    field: "costPriceInventory",
    headerName: "Costo",
    width: 80,
  },
  {
    field: "stockInventory",
    headerName: "Stock",
    width: 80,
  },
  {
    field: "statusInventory",
    headerName: "Status",
    width: 100,
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
    width: 130,
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

export const orderColumns = [
  {
    field: "Customer",
    headerName: "Nombre del cliente",
    width: 260,
    renderCell: (params: any) => {
      return <div>{params.row.customer.name_customer}</div>;
    },
  },
  {
    field: "User",
    headerName: "Nombre del vendedor",
    width: 260,
    renderCell: (params: any) => {
      return <div>{params.row.user.name_user}</div>;
    },
  },
  {
    field: "createdAt",
    headerName: "Fecha de la orden",
    width: 200,
    renderCell: (params: any) => {
      return (
        <div>{moment(params.row.createdAt).format("DD MMM YYYY - h:mm a")}</div>
      );
    },
  },
  {
    field: "typeOrder",
    headerName: "Tipo de orden",
    width: 130,
  },
  {
    field: "totalOrder",
    headerName: "Total de la orden",
    width: 160,
    // format to money
    renderCell: (params: any) => {
      return <div>{moneyFormat(params.row.totalOrder)}</div>;
    },
  },
  {
    field: "ActionOrder",
    headerName: "Acciones de estado",
    width: 180,
    renderCell: (params: any) => {
      // show a select to the next options: "Pendiente", "En proceso", "Entregado"
      return (
        <div className="cellWithStatus">
          <select
            name="statusOrder"
            id={`statusOrder${params.row.id}`}
            className="cellWithSelect"
            value={params.row.statusOrder}
            onChange={(e) => params.changeStatus(e, params.row._id)}
          >
            <option value="Pendiente">Pendiente</option>
            <option value="En proceso">En-proceso</option>
            <option value="Entregado">Entregado</option>
          </select>
        </div>
      );
    },
  },
  {
    field: "statusOrder",
    headerName: "Estado de la orden",
    width: 170,
    renderCell: (params: any) => {
      return (
        <div
          className={`cellWithStatus ${params.row.statusOrder.toLowerCase()}`}
        >
          {params.row.statusOrder}
        </div>
      );
    },
  },
];

export const orderDetailColumns = [
  {
    field: "imageInventory",
    headerName: "Imagen",
    width: 140,
    renderCell: (params: any) => {
      return (
        <div className="cellWithImage">
          {params.row.inventory.image_inventory.split(",")[0] === "" ? (
            <img src={params.row.inventory.image_inventory} alt="" />
          ) : (
            <img
              src={params.row.inventory.image_inventory.split(",")[0]}
              alt=""
            />
          )}
        </div>
      );
    },
  },
  {
    field: "name_inventory",
    headerName: "Nombre del producto",
    width: 400,
    renderCell: (params: any) => {
      return <div>{params.row.inventory.name_inventory}</div>;
    },
  },
  {
    field: "reference_inventory",
    headerName: "Referencia",
    width: 200,
    renderCell: (params: any) => {
      return <div>{params.row.inventory.reference_inventory}</div>;
    },
  },
  {
    field: "selling_price_inventory",
    headerName: "Precio unitario",
    width: 200,
    renderCell: (params: any) => {
      return (
        <div>{moneyFormat(params.row.inventory.selling_price_inventory)}</div>
      );
    },
  },
  {
    field: "quantity",
    headerName: "Cantidad",
    width: 150,
  },
  {
    field: "subtotal",
    headerName: "Subtotal",
    width: 180,
    renderCell: (params: any) => {
      return (
        <div>
          {moneyFormat(
            params.row.inventory.selling_price_inventory * params.row.quantity
          )}
        </div>
      );
    },
  },
];

export const orderDetailProductionColumns = [
  {
    field: "imageInventory",
    headerName: "Imagen",
    width: 200,
    renderCell: (params: any) => {
      return (
        <div className="cellWithImage">
          {params.row.inventory.image_inventory.split(",")[0] === "" ? (
            <img src={params.row.inventory.image_inventory} alt="" />
          ) : (
            <img
              src={params.row.inventory.image_inventory.split(",")[0]}
              alt=""
            />
          )}
        </div>
      );
    },
  },
  {
    field: "name_inventory",
    headerName: "Nombre del producto",
    width: 500,
    renderCell: (params: any) => {
      return <div>{params.row.inventory.name_inventory}</div>;
    },
  },
  {
    field: "reference_inventory",
    headerName: "Referencia",
    width: 240,
    renderCell: (params: any) => {
      return <div>{params.row.inventory.reference_inventory}</div>;
    },
  },
  {
    field: "quantity",
    headerName: "Cantidad",
    width: 200,
  },
];
