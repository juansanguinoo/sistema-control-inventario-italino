/* eslint-disable react-hooks/exhaustive-deps */ // Esto debe de cambiar
import "../styles.css";
import { FormImagesInventory } from "./FormImages";
import { useState, ChangeEvent, useEffect, FormEvent } from "react";
import { InventoryModel } from "../../../../domain/models/InventoryModel";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { Dispatch } from "redux";
import { getCategories } from "../../../../store/actions/categoryActions";
import { IFileData, IFilesState } from "../../../interfaces/interfaces";
import axios from "axios";
import {
  createInventory,
  getInventory,
  updateInventory,
} from "../../../../store/actions/inventoryActions";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

export const FormInventory = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<Dispatch<any>>(); // eslint-disable-line
  const params = useParams();
  const [inventoryData, setInventoryData] = useState<InventoryModel>({
    id: 0,
    referenceInventory: "",
    nameInventory: "",
    descriptionInventory: "",
    stockInventory: 0,
    statusInventory: "Inactivo",
    sellingPriceInventory: 0,
    costPriceInventory: 0,
    imageInventory: "",
    publicatedInventory: false,
    category: 0,
    categoryId: 0,
    addInventory: [],
  });
  const [send, setSend] = useState(false);
  const [hasImage, setHasImage] = useState(false);

  const [fileData, setFileData] = useState<IFilesState>({
    file1: null,
    file2: null,
    file3: null,
  });

  useEffect(() => {
    const images = inventoryData.imageInventory?.split(",");
    if (images) {
      setFileData({
        file1: images[0],
        file2: images[1] || null,
        file3: images[2] || null,
      });
    }
  }, [inventoryData]);

  const categories = useSelector(
    (state: RootState) => state.categoryReducer.categories
  );

  const inventories = useSelector(
    (state: RootState) => state.inventoryReducer.inventories
  );

  const getInventoryById = () => {
    const inventory = inventories.find(
      (inventory) => inventory.id === Number(params.id)
    );
    if (inventory) {
      setInventoryData({
        ...inventory,
        categoryId: inventory.category.id_category,
      });
    }
  };

  useEffect(() => {
    getInventoryById();
  }, []);

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getInventory());
  }, [dispatch]);

  useEffect(() => {
    if (send && hasImage) {
      const handleSendInformation = () => {
        if (
          inventoryData.referenceInventory === "" ||
          inventoryData.nameInventory === "" ||
          inventoryData.descriptionInventory === ""
        ) {
          setSend(false);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "¡Debes llenar todos los campos!",
          });
        } else if (
          inventoryData.stockInventory <= 0 ||
          isNaN(inventoryData.stockInventory)
        ) {
          setSend(false);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "¡Debes agregar un valor válido para el stock!",
          });
        } else if (inventoryData.category === 0) {
          setSend(false);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "¡Por favor selecciona una categoría!",
          });
        } else if (
          Object.values(fileData).some((value) => value !== null) === false
        ) {
          setSend(false);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "¡Debes subir al menos una imagen!",
          });
        } else if (
          inventoryData.imageInventory !== "" &&
          inventoryData.nameInventory !== "" &&
          inventoryData.referenceInventory !== "" &&
          inventoryData.descriptionInventory !== "" &&
          inventoryData.stockInventory > 0 &&
          inventoryData.category !== 0
        ) {
          if (params.id) {
            dispatch(updateInventory(inventoryData));
          } else {
            dispatch(createInventory(inventoryData));
          }
          Swal.fire(
            "¡Buen trabajo!",
            "¡Producto agregado con éxito!",
            "success"
          );
          navigate("/private/inventory");
        }
      };

      handleSendInformation();
      setSend(false);
      setHasImage(false);
    }
  }, [send, inventoryData, hasImage]);

  const handleCheckboxChangeStatus = (e: ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    setInventoryData((prevData: InventoryModel) => ({
      ...prevData,
      statusInventory: checked ? "Activo" : "Inactivo",
    }));
  };

  const handleCheckboxChangePublicated = (e: ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    setInventoryData((prevData: InventoryModel) => ({
      ...prevData,
      publicatedInventory: checked ? true : false,
    }));
  };

  const handleFileDataChange = (fileKey: string, fileData: IFileData) => {
    setFileData((prevState) => ({
      ...prevState,
      [fileKey]: fileData,
    }));
  };

  const handleUploadImages = async () => {
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const unsignedUploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
    const apiKey = import.meta.env.VITE_CLOUDINARY_API_KEY;

    const imagesPromise = Object.values(fileData)
      .filter((file) => file !== null && typeof file !== "string")
      .map((file) => {
        const formData = new FormData();
        formData.append("file", file?.file);
        formData.append("upload_preset", unsignedUploadPreset);
        formData.append("api_key", apiKey);
        formData.append("cloud_name", cloudName);

        return axios.post(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          formData
        );
      });

    try {
      const imagesResponse = await Promise.all(imagesPromise);
      const imagesUrl = imagesResponse.map((image) => image?.data.url);
      const urlsList = imagesUrl.join(", ");
      if (urlsList) {
        setInventoryData((prevData) => ({
          ...prevData,
          imageInventory: `${prevData.imageInventory}, ${urlsList}`,
        }));
        setHasImage(true);
      } else {
        setHasImage(true);
      }
    } catch (error) {
      console.error("Error uploading images:", error);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleUploadImages();
    setSend(true);
  };

  return (
    <form className="form" onSubmit={(e) => handleSubmit(e)}>
      <div className="data-column">
        <div className="column-1">
          <div className="form-group">
            <label htmlFor="productName">Nombre del producto:</label>
            <input
              type="text"
              id="productName"
              value={inventoryData.nameInventory}
              onChange={(event) =>
                setInventoryData((prevData) => ({
                  ...prevData,
                  nameInventory: event.target.value,
                }))
              }
            />
          </div>
          <div className="form-group">
            <label htmlFor="reference">Número de referencía:</label>
            <input
              type="text"
              id="reference"
              value={inventoryData.referenceInventory}
              onChange={(event) =>
                setInventoryData((prevData) => ({
                  ...prevData,
                  referenceInventory: event.target.value,
                }))
              }
            />
          </div>
          <div className="form-group">
            <select
              name="categoryId"
              id="categoryId"
              value={inventoryData.categoryId}
              onChange={(event) =>
                setInventoryData((prevData) => ({
                  ...prevData,
                  categoryId: parseInt(event.target.value),
                }))
              }
            >
              <option value="0">Seleccione una categoría</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.nameCategory}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group small-input">
            <label htmlFor="salePrice">Venta:</label>
            <input
              type="number"
              id="salePrice"
              value={inventoryData.sellingPriceInventory || ""}
              onChange={(event) =>
                setInventoryData((prevData) => ({
                  ...prevData,
                  sellingPriceInventory: parseInt(event.target.value),
                }))
              }
            />
          </div>
          <div className="form-group small-input">
            <label htmlFor="purchasePrice">Compra:</label>
            <input
              type="number"
              id="purchasePrice"
              value={inventoryData.costPriceInventory || ""}
              onChange={(event) =>
                setInventoryData((prevData) => ({
                  ...prevData,
                  costPriceInventory: parseInt(event.target.value),
                }))
              }
            />
          </div>
          <div className="form-group">
            <label htmlFor="stock">Cantidad en stock:</label>
            <input
              type="number"
              id="stock"
              value={inventoryData.stockInventory || ""}
              onChange={(event) =>
                setInventoryData((prevData) => ({
                  ...prevData,
                  stockInventory: parseInt(event.target.value),
                }))
              }
            />
          </div>
        </div>
        <div className="column-2">
          <div className="form-group">
            <label htmlFor="description">Descripción del producto:</label>
            <textarea
              name="description"
              id="description"
              cols={40}
              rows={20}
              value={inventoryData.descriptionInventory}
              onChange={(event) =>
                setInventoryData((prevData) => ({
                  ...prevData,
                  descriptionInventory: event.target.value,
                }))
              }
            ></textarea>
          </div>
          <div className="checkbox">
            <div className="form-group">
              <label htmlFor="btn-switch-active">Activar</label>
              <input
                type="checkbox"
                id="btn-switch-active"
                checked={inventoryData.statusInventory === "Activo"}
                onChange={handleCheckboxChangeStatus}
              />
              <label
                htmlFor="btn-switch-active"
                className="lbl-switch-active"
              ></label>
            </div>
            <div className="form-group">
              <label htmlFor="btn-switch-post">Publicar</label>
              <input
                type="checkbox"
                id="btn-switch-post"
                checked={inventoryData.publicatedInventory}
                onChange={handleCheckboxChangePublicated}
              />
              <label
                htmlFor="btn-switch-post"
                className="lbl-switch-post"
              ></label>
            </div>
          </div>
          <div className="form-group-button">
            {params.id ? (
              <button type="submit" className="form-button">
                Guardar cambios
              </button>
            ) : (
              <button type="submit" className="form-button">
                Crear
              </button>
            )}
          </div>
        </div>
      </div>
      <FormImagesInventory
        handleFileDataChange={handleFileDataChange}
        isEdit={true}
      />
    </form>
  );
};
