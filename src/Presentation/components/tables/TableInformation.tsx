import "./styles.css";
import MUIDataTable from "mui-datatables";
import { useState, useEffect } from "react";
import axios from "axios";

export type FilterType = "checkbox" | "dropdown" | "multiselect" | "textField";

export const TableInformation = () => {
  const [products, setProducts] = useState([]);

  const endpoint = "https://fakestoreapi.com/products";

  const getData = async () => {
    await axios.get(endpoint).then((response) => {
      const data = response.data;
      console.log(data);
      setProducts(data);
    });
  };

  useEffect(() => {
    getData();
  }, []);

  const columns = [
    {
      name: "image",
      label: "Image",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value: string) => (
          <img src={value} alt="product" className="table-image" />
        ),
      },
    },
    {
      name: "title",
      label: "Product Name",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "category",
      label: "Category",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "price",
      label: "Price",
      options: {
        filter: true,
        sort: true,
      },
    },
  ];

  const options = {
    filterType: "checkbox" as FilterType,
    rowsPerPage: 7,
    tableBodyHeight: "450px",
  };

  return (
    <div className="table-container">
      <MUIDataTable
        title={"Products List"}
        data={products}
        columns={columns}
        options={options}
      />
    </div>
  );
};
