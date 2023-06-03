import "./styles.css";
import { CategoryModel } from "../../../domain/models/CategoryModel";
import { IColumnsDataTable } from "../../interfaces/interfaces";
import { DataGrid } from "@mui/x-data-grid";
import { ModalCategory } from "../../pages/category/components/Modal";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { useState } from "react";

interface ITableInformationProps {
  categories: CategoryModel[] | [];
  columns: IColumnsDataTable[];
  deleteCategory: (id: number) => void;
}

export const TableInformation = ({
  categories,
  columns,
  deleteCategory,
}: ITableInformationProps) => {
  const dispatch = useDispatch<Dispatch<any>>(); // eslint-disable-line
  const [showModal, setShowModal] = useState<boolean>(false);
  const [actions, setActions] = useState<string>("");
  const [categoryData, setCategoryData] = useState<CategoryModel>({
    nameCategory: "",
    referenceCategory: "",
    statusCategory: "Inactive",
    descriptionCategory: "",
  });

  const openModal = (props?: string) => {
    if (props) {
      setActions(props);
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleWatch = (params: any) => {
    setCategoryData(params.row);
    openModal("watch");
  };

  const handleEdit = (params: any) => {
    setCategoryData(params.row);
    openModal("edit");
  };

  const handleDelete = (params: any) => {
    dispatch(deleteCategory(params.row.idCategory));
  };

  const rowsWithId = categories.map((category) => {
    return {
      ...category,
      id: category.idCategory,
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
            <div className="viewButton" onClick={() => handleWatch(params)}>
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

  if (showModal) {
    return (
      <ModalCategory
        onCloseModal={closeModal}
        initialState={categoryData}
        action={actions}
      />
    );
  }

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
