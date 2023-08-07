import { IInventoryModelSelected } from "../../../interfaces/IInventoryModelSelected";

interface ISelectedProductsProps {
  selectedInventory: IInventoryModelSelected[];
  handleRemoveInventory: (inventory: IInventoryModelSelected) => void;
  handleAddOrRemoveQuantityByInput: (
    inventory: IInventoryModelSelected,
    quantity: string
  ) => void;
  handleQuantityInputFocus: (value: boolean) => void;
  isEdit?: boolean;
}

export const SelectedProducts = ({
  selectedInventory,
  handleRemoveInventory,
  handleAddOrRemoveQuantityByInput,
  handleQuantityInputFocus,
  isEdit = false,
}: ISelectedProductsProps) => {
  const moneyFormat = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  };

  return (
    <div className="modal-products-selected">
      {selectedInventory.map((inventory) => (
        <div key={inventory.inventoryId} className="modal-product-selected">
          <div className="modal-product-img-selected">
            <img
              src={inventory.imageInventory}
              alt="product-image"
              width={60}
              height={60}
            />
            <p className="subtotal-text-selected">Sub-total</p>
          </div>
          <div className="modal-product-detail-selected">
            <p className="modal-product-name">{inventory.nameInventory}</p>
            <div className="modal-product-footer">
              <p className="modal-product-price">
                {moneyFormat(inventory.sellingPriceInventory)}
              </p>
            </div>
          </div>
          <div className="modal-product-quantity">
            <div className="modal-product-quantity-space">
              {!isEdit ? (
                <p
                  className="modal-product-quantity-remove"
                  onClick={() => handleRemoveInventory(inventory)}
                >
                  Eliminar
                </p>
              ) : null}
            </div>
            <div className="modal-product-quantity-buttons">
              <input
                className="modal-product-quantity-value-input"
                type="text"
                id={`quantityOrder ${inventory.inventoryId}`}
                name="quantityOrder"
                value={inventory.quantity || ""}
                onFocus={() => handleQuantityInputFocus(true)}
                onBlur={() => handleQuantityInputFocus(false)}
                onChange={(e) =>
                  handleAddOrRemoveQuantityByInput(inventory, e.target.value)
                }
                readOnly={isEdit}
              />
            </div>
            <div className="modal-product-quantity-subtotal">
              <p className="modal-product-quantity-subtotal-value">
                {moneyFormat(inventory.subTotal)}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
