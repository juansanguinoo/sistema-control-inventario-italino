import { IInventoryModelSelected } from "../../../interfaces/IInventoryModelSelected";

interface ISelectedProductsProps {
  selectedInventory: IInventoryModelSelected[];
  handleRemoveInventory: (inventory: IInventoryModelSelected) => void;
  handleAddOrRemoveQuantity: (
    inventory: IInventoryModelSelected,
    action: string
  ) => void;
}

export const SelectedProducts = ({
  selectedInventory,
  handleRemoveInventory,
  handleAddOrRemoveQuantity,
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
              <p
                className="modal-product-quantity-remove"
                onClick={() => handleRemoveInventory(inventory)}
              >
                Eliminar
              </p>
            </div>
            <div className="modal-product-quantity-buttons">
              <button
                type="button"
                className="modal-product-minus-button"
                onClick={() => handleAddOrRemoveQuantity(inventory, "remove")}
              >
                -
              </button>
              <p className="modal-product-quantity-value">
                {inventory.quantity}
              </p>
              <button
                type="button"
                className="modal-product-plus-button"
                onClick={() => handleAddOrRemoveQuantity(inventory, "add")}
              >
                +
              </button>
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
