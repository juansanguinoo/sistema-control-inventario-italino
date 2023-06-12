import "./styles.css";
import { IColumnsDataTable } from "../../interfaces/interfaces";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";

interface ITableInformationProps {
  categories?: any[] | [];
  columns?: IColumnsDataTable[];
  deleteCategory?: (id: number) => void;
  showView?: boolean;
  handleEditAction?: (params: any) => void;
  handlePreviewAction?: (params: any) => void;
}

export const TableInformation = ({
  categories,
  columns,
  deleteCategory,
  showView = true,
  handleEditAction,
  handlePreviewAction,
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
      dispatch(deleteCategory(params.row.id));
    }
  };

  const rowsWithId = categories?.map((category, index) => {
    return { ...category, id: index + 1 };
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
            <div className="deleteButton" onClick={() => handleDelete(params)}>
              Eliminar
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <div className="datatable">
      <DataGrid
        rows={rowsWithId || []}
        columns={columns ? [...columns, ...actionsColumns] : []}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
      />
    </div>
  );
};
