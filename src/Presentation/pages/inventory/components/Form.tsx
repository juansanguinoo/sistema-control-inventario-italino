import "../styles.css";
import { RichTextInput } from "../../../components/richtextinput/RichTextInput";
import { FormImagesInventory } from "./FormImages";
import {
  useState,
  ChangeEvent,
  useEffect,
  FormEvent,
  useCallback,
} from "react";
import { InventoryModel } from "../../../../domain/models/InventoryModel";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { Dispatch } from "redux";
import { getCategories } from "../../../../store/actions/categoryActions";
import {
  IFileData,
  IFileName,
  IFilesState,
} from "../../../interfaces/interfaces";
import axios from "axios";
import { createInventory } from "../../../../store/actions/inventoryActions";

export const FormInventory = () => {
  const dispatch = useDispatch<Dispatch<any>>(); // eslint-disable-line
  const [inventoryData, setInventoryData] = useState<InventoryModel>({
    referenceInventory: "",
    nameInventory: "",
    descriptionInventory: "",
    stockInventory: 0,
    statusInventory: "",
    sellingPriceInventory: 0,
    costPriceInventory: 0,
    imageInventory: "",
    publicatedInventory: "",
    category: 0,
  });

  const [fileData, setFileData] = useState<IFilesState>({
    file1: null,
    file2: null,
    file3: null,
  });

  const [uploadedImages, setUploadedImages] = useState<string>("");

  const categories = useSelector(
    (state: RootState) => state.categoryReducer.categories
  );

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const handleCheckboxChangeStatus = (e: ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    setInventoryData((prevData: InventoryModel) => ({
      ...prevData,
      statusInventory: checked ? "Active" : "Inactive",
    }));
  };

  const handleCheckboxChangePublicated = (e: ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    setInventoryData((prevData: InventoryModel) => ({
      ...prevData,
      publicatedInventory: checked ? "Active" : "Inactive",
    }));
  };

  const handleFileDataChange = (fileKey: string, fileData: IFileData) => {
    setFileData((prevState) => ({
      ...prevState,
      [fileKey]: fileData,
    }));
  };

  const handleUploadImages = useCallback(async () => {
    const cloudName = "dahcvsp9v";
    const unsignedUploadPreset = "ProductosItalino";
    const apiKey = "221939461327129";

    const imagesPromise = Object.values(fileData)
      .filter((file) => file !== null)
      .map((file) => {
        const formData = new FormData();
        formData.append("file", file.file);
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
      setInventoryData((prevData) => ({
        ...prevData,
        imageInventory: urlsList,
      }));
    } catch (error) {
      console.error("Error uploading images:", error);
    }
  }, [fileData]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await handleUploadImages();
    dispatch(createInventory(inventoryData));
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
              required
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
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="category">Seleccione la categoría</label>
            <select
              name="category"
              id="category"
              value={inventoryData.category}
              onChange={(event) =>
                setInventoryData((prevData) => ({
                  ...prevData,
                  category: parseInt(event.target.value),
                }))
              }
              required
            >
              <option value="0">Seleccione una categoría</option>
              {categories.map((category) => (
                <option key={category.idCategory} value={category.idCategory}>
                  {category.nameCategory}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group small-input">
            <label htmlFor="salePrice">Costo de venta:</label>
            <input
              type="number"
              id="salePrice"
              value={inventoryData.sellingPriceInventory || 0}
              onChange={(event) =>
                setInventoryData((prevData) => ({
                  ...prevData,
                  sellingPriceInventory: parseInt(event.target.value),
                }))
              }
              required
            />
          </div>
          <div className="form-group small-input">
            <label htmlFor="purchasePrice">Costo de compra:</label>
            <input
              type="number"
              id="purchasePrice"
              value={inventoryData.costPriceInventory || 0}
              onChange={(event) =>
                setInventoryData((prevData) => ({
                  ...prevData,
                  costPriceInventory: parseInt(event.target.value),
                }))
              }
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="stock">Cantidad en stock:</label>
            <input
              type="number"
              id="stock"
              value={inventoryData.stockInventory}
              onChange={(event) =>
                setInventoryData((prevData) => ({
                  ...prevData,
                  stockInventory: parseInt(event.target.value),
                }))
              }
              required
            />
          </div>
        </div>
        <div className="column-2">
          <div className="form-group">
            <label htmlFor="description">Descripción del producto</label>
            <textarea
              name="description"
              id="description"
              cols={30}
              rows={10}
              value={inventoryData.descriptionInventory}
              onChange={(event) =>
                setInventoryData((prevData) => ({
                  ...prevData,
                  descriptionInventory: event.target.value,
                }))
              }
              required
            ></textarea>
          </div>
          <div className="checkbox">
            <div className="form-group">
              <label htmlFor="btn-switch-active">Activar producto</label>
              <input
                type="checkbox"
                id="btn-switch-active"
                checked={inventoryData.statusInventory === "Active"}
                onChange={handleCheckboxChangeStatus}
              />
              <label
                htmlFor="btn-switch-active"
                className="lbl-switch-active"
              ></label>
            </div>
            <div className="form-group">
              <label htmlFor="btn-switch-post">Publicar producto</label>
              <input
                type="checkbox"
                id="btn-switch-post"
                checked={inventoryData.publicatedInventory === "Active"}
                onChange={handleCheckboxChangePublicated}
              />
              <label
                htmlFor="btn-switch-post"
                className="lbl-switch-post"
              ></label>
            </div>
          </div>
          <div className="form-group">
            <button type="submit">Guardar</button>
          </div>
        </div>
      </div>
      <FormImagesInventory handleFileDataChange={handleFileDataChange} />
    </form>
  );
};
