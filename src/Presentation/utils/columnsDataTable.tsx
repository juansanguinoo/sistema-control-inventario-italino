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
