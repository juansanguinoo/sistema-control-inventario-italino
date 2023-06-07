import "./styles.css";
import { IColumnsDataTable } from "../../interfaces/interfaces";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";

interface ITableInformationProps {
  categories: any[] | [];
  columns: IColumnsDataTable[];
  deleteCategory: (id: number) => void;
  handleEditAction?: (params: any) => void;
  handlePreviewAction?: (params: any) => void;
}

export const TableInformation = ({
  categories,
  columns,
  deleteCategory,
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
    dispatch(deleteCategory(params.row.id));
  };

  const rowsWithId = categories.map((category) => {
    return {
      ...category,
      id: category.id,
    };
  });

  const actionsColumns = [
    {
      field: "actions",
      headerName: "Acciones",
      width: 270,
      renderCell: (params: any) => {
        return (
          <div className="cellAction">
            <div className="viewButton" onClick={() => handlePreview(params)}>
              Ver
            </div>
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
        rows={rowsWithId}
        columns={columns.concat(actionsColumns)}
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
