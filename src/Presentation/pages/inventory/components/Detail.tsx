/* eslint-disable react-hooks/exhaustive-deps */ // Esto debe de cambiar
import "../styles.css";
import Bag from "../../../assets/Bag.svg";
import User from "../../../assets/User.svg";
import { useEffect, useState } from "react";
import { InventoryModel } from "../../../../domain/models/InventoryModel";
import { Dispatch } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { getInventory } from "../../../../store/actions/inventoryActions";
import { useParams } from "react-router-dom";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

export const DetailInventory = () => {
  const dispatch = useDispatch<Dispatch<any>>(); // eslint-disable-line
  const params = useParams();
  const [addStock, setAddStock] = useState(false); // eslint-disable-line
  const [isResponsive, setIsResponsive] = useState(false);
  const [inventoryData, setInventoryData] = useState<InventoryModel>({
    referenceInventory: "",
    nameInventory: "",
    descriptionInventory: "",
    stockInventory: 0,
    statusInventory: "Inactive",
    sellingPriceInventory: 0,
    costPriceInventory: 0,
    imageInventory: "",
    publicatedInventory: false,
    category: "",
  });

  const inventories = useSelector(
    (state: RootState) => state.inventoryReducer.inventories
  );

  useEffect(() => {
    dispatch(getInventory());
  }, [dispatch]);

  const getInventoryById = () => {
    const inventory = inventories.find(
      (inventory) => inventory.id === Number(params.id)
    );
    if (inventory) {
      setInventoryData(inventory);
    }
  };

  useEffect(() => {
    getInventoryById();
  }, [getInventoryById]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1300) {
        setIsResponsive(true);
      } else {
        setIsResponsive(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isResponsive]);

  const images = inventoryData.imageInventory?.split(", ");

  const divStyle = {
    maxWidth: "260px",
    minWidth: "260px",
    maxHeight: "200px",
    minHeight: "200px",
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
  };

  useEffect(() => {
    console.log(addStock);
  }, [addStock]);

  return (
    <>
      <div className="detail">
        <div className="detail-img">
          <Slide>
            {images?.map((slideImage, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    ...divStyle,
                    backgroundImage: `url(${slideImage})`,
                  }}
                ></div>
              </div>
            ))}
          </Slide>
        </div>
        <div className="detail-info">
          <div className="info">
            <div className="info-name">
              <h3>{inventoryData.nameInventory}</h3>
            </div>
            <div className="info-status">
              <p>{inventoryData.statusInventory}</p>
            </div>
          </div>
          <div className="info-2">
            <div className="info-referency">
              <h4>Referencia</h4>
              <p>{inventoryData.referenceInventory}</p>
            </div>
            <div className="info-category">
              <h4>Categoría</h4>
              <p>
                {inventoryData.category
                  ? inventoryData.category.name_category
                  : "No tiene"}
              </p>
            </div>
          </div>
        </div>
        <div className="detail-price">
          <div className="price-img">
            <img src={Bag} alt="icon" />
          </div>
          <div className="price-title">
            <h4>Precio</h4>
            <h3>$ {inventoryData.sellingPriceInventory}</h3>
          </div>
        </div>
        {isResponsive && (
          <div className="detail-stock">
            <div className="stock-img">
              <img src={Bag} alt="icon" />
            </div>
            <div className="stock-title">
              <h4>Stock</h4>
              <h3>{inventoryData.stockInventory}</h3>
            </div>
          </div>
        )}
      </div>
      <div className="detail">
        <div className="detail-data">
          <div className="data-img">
            <img src={User} alt="icon" />
          </div>
          <div className="data-content">
            <div className="selling-price">
              <h4>Precio de venta</h4>
              <p>$ {inventoryData.sellingPriceInventory}</p>
            </div>
            <div className="cost-price">
              <h4>Precio de costo</h4>
              <p>$ {inventoryData.costPriceInventory}</p>
            </div>
            <div className="publicated">
              <h4>Publicado</h4>
              <p>{inventoryData.publicatedInventory ? "Sí" : "No"}</p>
            </div>
          </div>
        </div>
        {!isResponsive && (
          <div className="detail-stock">
            <div className="stock-img">
              <img src={Bag} alt="icon" />
            </div>
            <div className="stock-title">
              <h4>Stock</h4>
              <h3>{inventoryData.stockInventory}</h3>
            </div>
          </div>
        )}
      </div>
      <div className="product-entries">
        <label
          className="label-detail-add-stock"
          htmlFor="btn-switch-add-stock"
        >
          Desea agregar mas stock:
        </label>
        <input
          type="checkbox"
          id="btn-switch-add-stock"
          checked={addStock}
          onChange={() => setAddStock(!addStock)}
        />
        <label
          htmlFor="btn-switch-add-stock"
          className="lbl-switch-add-stock"
        ></label>
        {addStock && (
          <div className="product-entries-input">
            <input
              id="productEntries"
              className="product-entries-value-input"
              placeholder="Agregar stock"
              type="text"
            />
            <button>Agregar</button>
          </div>
        )}
      </div>
    </>
  );
};
