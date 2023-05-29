import "../styles.css";
import { RichTextInput } from "../../../components/richtextinput/RichTextInput";
import { FormImagesInventory } from "./FormImages";

export const FormInventory = () => {
  return (
    <div className="form">
      <div className="data-column">
        <div className="column-1">
          <div className="form-group">
            <label htmlFor="productName">Nombre del producto</label>
            <input type="text" id="productName" />
          </div>
          <div className="form-group">
            <label htmlFor="reference">Número de referencia</label>
            <input type="number" id="reference" />
          </div>
          <div className="form-group">
            <label htmlFor="category">Seleccione la categoría</label>
            <select id="category">{/* opciones de categorías */}</select>
          </div>
          <div className="form-group small-input">
            <label htmlFor="salePrice">Costo de venta</label>
            <input type="number" id="salePrice" />
          </div>
          <div className="form-group small-input">
            <label htmlFor="purchasePrice">Costo de compra</label>
            <input type="number" id="purchasePrice" />
          </div>
          <div className="form-group">
            <label htmlFor="stock">Cantidad en stock</label>
            <input type="number" id="stock" />
          </div>
        </div>
        <div className="column-2">
          <div className="form-group">
            <label htmlFor="description">Descripción del producto</label>
            <RichTextInput />
          </div>
          <div className="checkbox">
            <div className="form-group">
              <label htmlFor="btn-switch-active">Activar producto</label>
              <input type="checkbox" id="btn-switch-active" />
              <label
                htmlFor="btn-switch-active"
                className="lbl-switch-active"
              ></label>
            </div>
            <div className="form-group">
              <label htmlFor="btn-switch-post">Publicar producto</label>
              <input type="checkbox" id="btn-switch-post" />
              <label
                htmlFor="btn-switch-post"
                className="lbl-switch-post"
              ></label>
            </div>
          </div>
        </div>
      </div>
      <FormImagesInventory />
    </div>
  );
};
