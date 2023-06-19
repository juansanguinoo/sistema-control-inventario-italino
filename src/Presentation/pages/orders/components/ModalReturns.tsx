import SearchIcon from "../../../assets/icons8-search.svg";
import { useState, useEffect } from "react";
import "./stylesModalReturns.css";
import { OrderResponseModel } from "../../../../domain/models/OrderResponseModel";

interface ModalReturnsProps {
  onCloseModal?: () => void;
  orderData: OrderResponseModel;
}

export const ModalReturns = ({
  onCloseModal,
  orderData,
}: ModalReturnsProps) => {
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    console.log(orderData);
  }, [orderData]);

  return (
    <>
      <div className="modal-orders-returns">
        <div className="modal-orders-returns-content">
          <div className="modal-orders-returns-header">
            <h4>Devoluciones</h4>
            <span className="close" onClick={onCloseModal}>
              &times;
            </span>
          </div>
          <p className="form-modal-detail">Devolver productos</p>
          <div className="modal-order-returns-main">
            <div className="search-bar-returns">
              <input
                type="search"
                name="product"
                id="product"
                placeholder="Buscar producto..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <div className="search-button">
                <img src={SearchIcon} alt="" />
              </div>
            </div>
            <div className="modal-order-returns-list">
              {orderData.orderDetails.map((orderDetail: any) => (
                <div
                  key={orderDetail.inventory.id_inventory}
                  className="modal-product-selected"
                >
                  <div className="modal-product-img-selected">
                    <img
                      src={orderDetail.inventory.image_inventory}
                      alt="product-image"
                      width={60}
                      height={60}
                    />
                  </div>
                  <div className="modal-product-detail-selected">
                    <p className="modal-product-name">
                      {orderDetail.inventory.name_inventory}
                    </p>
                    <p className="modal-product-name">
                      Referencia: {orderDetail.inventory.reference_inventory}
                    </p>
                    <div className="modal-product-footer">
                      <p className="modal-product-price">
                        Cantidad: {orderDetail.quantity}
                      </p>
                    </div>
                  </div>
                  <div className="modal-product-quantity">
                    <div className="modal-product-quantity-space">
                      <p className="modal-product-quantity-return">
                        Cantidad de productos a devolver
                      </p>
                    </div>
                    <div className="modal-product-quantity-buttons">
                      <input
                        className="modal-product-quantity-value-input"
                        type="text"
                        id={`quantityOrder ${orderDetail.inventory.id_inventory}`}
                        name="quantityOrder"
                        value={orderDetail.quantity || ""}
                        onChange={(e) => console.log(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="cancel-button"
              onClick={onCloseModal}
            >
              Cancelar
            </button>
            <button type="submit" className="add-button">
              Editar orden
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
