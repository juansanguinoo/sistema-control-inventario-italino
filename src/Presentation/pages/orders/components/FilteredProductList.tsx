import { InventoryModel } from "../../../../domain/models/InventoryModel";
import "../styles.css";

interface IFilteredProductListProps {
  inventoriesFiltered: InventoryModel[];
  handleAddInventory: (inventory: InventoryModel) => void;
}

export const FilteredProductList = ({
  inventoriesFiltered,
  handleAddInventory,
}: IFilteredProductListProps) => {
  const moneyFormat = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  };

  return (
    <div className="modal-products">
      {inventoriesFiltered.map((inventory) => (
        <div key={inventory.id} className="modal-product">
          <div className="modal-product-img">
            <img
              src={inventory.imageInventory}
              alt="product-image"
              width={60}
              height={60}
            />
          </div>
          <div className="modal-product-detail">
            <p className="modal-product-name">{inventory.nameInventory}</p>
            <p className="modal-product-name">{inventory.referenceInventory}</p>
            <div className="modal-product-footer">
              <p className="modal-product-name">
                stock: {inventory.stockInventory}
              </p>
              <p className="modal-product-price">
                {moneyFormat(inventory.sellingPriceInventory)}
              </p>
            </div>
          </div>
          <div className="modal-product-add">
            <button
              type="button"
              className="modal-product-add-button"
              onClick={() => handleAddInventory(inventory)}
            >
              Agregar Item
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
