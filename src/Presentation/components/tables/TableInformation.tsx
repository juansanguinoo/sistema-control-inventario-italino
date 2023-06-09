import "./styles.css";
import { IColumnsDataTable } from "../../interfaces/interfaces";
import { DataGrid } from "@mui/x-data-grid";

interface ITableInformationProps {
  categories?: any[] | [];
  columns?: IColumnsDataTable[];
  deleteCategory?: (params: any) => void;
  showView?: boolean;
  showDelete?: boolean;
  showEdit?: boolean;
  handleEditAction?: (params: any) => void;
  handlePreviewAction?: (params: any) => void;
  showActions?: boolean;
}

export const TableInformation = ({
  categories,
  columns,
  deleteCategory,
  showView = true,
  showDelete = true,
  showEdit = true,
  handleEditAction,
  handlePreviewAction,
  showActions = true,
}: ITableInformationProps) => {
  const handlePreview = (params: any) => {
    if (handlePreviewAction) {
      handlePreviewAction(params);
    }
  };

  const handleEdit = (params: any) => {
    if (handleEditAction) {
      handleEditAction(params);
    }
  };

  const handleDelete = (params: any) => {
    if (deleteCategory) {
      deleteCategory(params);
    }
  };

  const rowsWithId = categories?.map((category, index) => {
    return { ...category, id: category.id || index };
  });

  const actionsColumns = [
    {
      field: "actions",
      headerName: "Acciones",
      width: 270,
      renderCell: (params: any) => {
        return (
          <div className="cellAction">
            {showView && (
              <div className="viewButton" onClick={() => handlePreview(params)}>
                Ver
              </div>
            )}
            {showEdit && (
              <div className="editButton" onClick={() => handleEdit(params)}>
                Editar
              </div>
            )}
            {showDelete && (
              <div
                className="deleteButton"
                onClick={() => handleDelete(params)}
              >
                Eliminar
              </div>
            )}
          </div>
        );
      },
    },
  ];

  return (
    <div className="datatable">
      <DataGrid
        rows={rowsWithId || []}
        columns={
          showActions ? (columns || []).concat(actionsColumns) : columns || []
        }
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[10, 20]}
      />
    </div>
  );
};
