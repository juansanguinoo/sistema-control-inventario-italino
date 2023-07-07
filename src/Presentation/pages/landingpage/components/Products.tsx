import { getInventory } from "../../../../store/actions/inventoryActions";
import { useEffect } from "react";
import { RootState } from "../../../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { InventoryModel } from "../../../../domain/models/InventoryModel";

export const ProductsLandingPage = () => {
  const dispatch = useDispatch<Dispatch<any>>(); // eslint-disable-line

  const inventories: InventoryModel[] = useSelector(
    (state: RootState) => state.inventoryReducer.inventories
  );

  const firstTenInventories = [];

  for (let i = 0; i < inventories.length; i++) {
    if (inventories[i]?.publicatedInventory === true) {
      firstTenInventories.push(inventories[i]);
    }

    if (firstTenInventories.length === 10) {
      break;
    }
  }

  // const firstTenInventories = inventories.filter(
  //   (inventory) => inventory.publicatedInventory === true
  // ).slice(0, 10);

  useEffect(() => {
    dispatch(getInventory());
  }, [dispatch]);

  return (
    <div className="products-landing" id="Productos">
      <div className="products-landing-content">
        <div className="products-title">
          <h1>Nuestros Productos</h1>
        </div>
        <div className="products-cards">
          {firstTenInventories.map((inventory: InventoryModel) => {
            const image = inventory.imageInventory?.split(", ")[0];
            return (
              <div className="card-landing" key={inventory.id}>
                <div className="card-landing-image">
                  <img src={image} alt="" />
                </div>
                <div className="card-landing-content">
                  <div className="product-name">
                    <h3>{inventory.nameInventory}</h3>
                  </div>
                  <div className="product-reference">
                    <p>Referencía - {inventory.referenceInventory}</p>
                  </div>
                  <div className="product-price">
                    <p>${inventory.sellingPriceInventory}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
