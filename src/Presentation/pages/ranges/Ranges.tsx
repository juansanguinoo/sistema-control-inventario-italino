import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { PageTitle } from "../../components/titles/PageTitle";
import "./styles.css";
import { Dispatch } from "redux";
import { useEffect, useState } from "react";
import { getInventoriesByCategoryId } from "../../../store/actions/inventoryActions";
import { getCategories } from "../../../store/actions/categoryActions";
import Swal from "sweetalert2";

export const Ranges = () => {
  const [value, setValue] = useState("");
  const dispatch = useDispatch<Dispatch<any>>(); // eslint-disable-line
  const navbarOpen = useSelector(
    (state: RootState) => state.navbarReducer.stateOpen
  );
  const navbarClass = navbarOpen ? "expanded" : "collapsed";

  const inventories = useSelector(
    (state: RootState) => state.inventoryReducer.inventoryByCategory
  );

  const categories = useSelector(
    (state: RootState) => state.categoryReducer.categories
  );

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const handleSearch = () => {
    const categoryId = categories.find((c) => c.nameCategory == value)?.id;
    if (categoryId) {
      dispatch(getInventoriesByCategoryId(categoryId));
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No se encontró la categoría",
      });
    }
  };

  return (
    <div className={`ranges-container ${navbarClass}`}>
      <div className="ranges-header">
        <PageTitle title="Gama de colores" />
        <div className="ranges-input-container">
          <input
            type="text"
            placeholder="Buscar por categoría"
            className="ranges-search"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <button className="ranges-button" onClick={handleSearch}>
            Buscar
          </button>
        </div>
      </div>
      <div className="ranges-main">
        {inventories.map((inventory) => {
          const image = inventory.imageInventory?.split(", ")[0];
          return (
            <div className="ranges-card" key={inventory.id}>
              <div className="ranges-card-img">
                <img src={image} alt="" />
              </div>
              <div className="ranges-card-info">
                <h3>{inventory.nameInventory}</h3>
                <p>{inventory.referenceInventory}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
