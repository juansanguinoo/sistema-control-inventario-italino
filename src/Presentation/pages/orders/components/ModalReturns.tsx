import SearchIcon from "../../../assets/icons8-search.svg";
import { useState, useEffect } from "react";
import "./stylesModalReturns.css";
import { OrderResponseModel } from "../../../../domain/models/OrderResponseModel";
import {
  OrderReturn,
  OrderReturnRequest,
} from "../../../../domain/models/OrderReturnRequest";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { createOrderReturn } from "../../../../store/actions/orderActions";

interface ModalReturnsProps {
  onCloseModal?: () => void;
  orderData: OrderResponseModel;
}

export const ModalReturns = ({
  onCloseModal,
  orderData,
}: ModalReturnsProps) => {
  const dispatch = useDispatch<Dispatch<any>>(); // eslint-disable-line
  const [search, setSearch] = useState<string>("");
  const [returnProducts, setReturnProducts] = useState<OrderReturn[]>([]);
  const [dataToSend, setDataToSend] = useState<OrderReturnRequest>({
    id: orderData.id,
    orderDetails: orderData.orderDetails.map((orderDetail: any) => ({
      inventoryId: orderDetail.inventory.id_inventory,
    })),
    OrderReturns: [],
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    dispatch(createOrderReturn(dataToSend));
    onCloseModal && onCloseModal();
  };

  useEffect(() => {
    const initialReturnProducts = orderData.orderDetails.map(
      (orderDetail: any) => ({
        inventoryId: orderDetail.inventory.id_inventory,
        quantity: 0,
      })
    );
    setReturnProducts(initialReturnProducts);
  }, [orderData]);

  useEffect(() => {
    setDataToSend({ ...dataToSend, OrderReturns: returnProducts });
  }, [returnProducts]);

  const handleReturnQuantityChange = (
    inventoryId: number,
    quantity: number
  ) => {
    const updatedReturnProducts = returnProducts.map((returnProduct) => {
      if (returnProduct.inventoryId === inventoryId) {
        return { ...returnProduct, quantity };
      }
      return returnProduct;
    });
    setReturnProducts(updatedReturnProducts);
  };

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
                        value={
                          returnProducts.find(
                            (returnProduct) =>
                              returnProduct.inventoryId ===
                              orderDetail.inventory.id_inventory
                          )?.quantity || ""
                        }
                        onChange={(e) =>
                          handleReturnQuantityChange(
                            orderDetail.inventory.id_inventory,
                            parseInt(e.target.value, 10)
                          )
                        }
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
            <button type="button" className="add-button" onClick={handleSubmit}>
              Editar orden
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
