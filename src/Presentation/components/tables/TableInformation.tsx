import "./styles.css";
import { IColumnsDataTable } from "../../interfaces/interfaces";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import Swal from "sweetalert2";

interface ITableInformationProps {
  categories?: any[] | [];
  columns?: IColumnsDataTable[];
  deleteCategory?: (id: number) => void;
  showView?: boolean;
  showDelete?: boolean;
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
  handleEditAction,
  handlePreviewAction,
  showActions = true,
}: ITableInformationProps) => {
  const dispatch = useDispatch<Dispatch<any>>();

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
      Swal.fire({
        title: "¿Estás seguro?",
        text: "¡No podrás deshacer esta acción!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "!Sí, eliminar!",
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(deleteCategory(params.row.id));
          Swal.fire(
            "¡Eliminado!",
            "Ha sido eliminado correctamente.",
            "success"
          );
        }
      });
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
            <div className="editButton" onClick={() => handleEdit(params)}>
              Editar
            </div>
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
