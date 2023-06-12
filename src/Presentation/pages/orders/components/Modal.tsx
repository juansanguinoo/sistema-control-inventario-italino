import { useDispatch, useSelector } from "react-redux";
import SearchIcon from "../../../assets/icons8-search.svg";
import { Dispatch } from "redux";
import { useEffect, useState } from "react";
import { getInventory } from "../../../../store/actions/inventoryActions";
import { InventoryModel } from "../../../../domain/models/InventoryModel";
import { RootState } from "../../../../store/store";
import { FilteredProductList } from "./FilteredProductList";
import { SelectedProducts } from "./SelectedProducts";
import { FilterMessage } from "./FilterMessage";
import { IInventoryModelSelected } from "../../../interfaces/IInventoryModelSelected";

interface IModalOrdersProps {
  onCloseModal?: () => void;
}

export const ModalOrders = ({ onCloseModal }: IModalOrdersProps) => {
  const dispatch = useDispatch<Dispatch<any>>(); // eslint-disable-line
  const [search, setSearch] = useState<string>("");
  const [inventoriesFiltered, setInventoriesFiltered] = useState<
    InventoryModel[]
  >([]);
  const [selectedInventory, setSelectedInventory] = useState<
    IInventoryModelSelected[]
  >([]);
  const [totalToPay, setTotalToPay] = useState<number>(0);
  const inventories: InventoryModel[] = useSelector(
    (state: RootState) => state.inventoryReducer.inventories
  );

  const moneyFormat = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  };

  const handleAddInventory = (inventory: InventoryModel) => {
    const inventorySelected: IInventoryModelSelected = {
      inventoryId: inventory.id!,
      nameInventory: inventory.nameInventory,
      imageInventory: inventory.imageInventory!,
      sellingPriceInventory: inventory.sellingPriceInventory,
      stockInventory: inventory.stockInventory,
      quantity: 1,
      subTotal: inventory.sellingPriceInventory,
    };

    // if inventory already exists, add 1 to quantity
    const inventoryExists = selectedInventory.find(
      (inventorySelected) =>
        inventorySelected.inventoryId === inventory.id &&
        inventorySelected.quantity > 0
    );

    if (inventoryExists) {
      const updatedInventory = selectedInventory.map((inventorySelected) => {
        if (inventorySelected.inventoryId === inventory.id) {
          return {
            ...inventorySelected,
            quantity: inventorySelected.quantity + 1,
            subTotal:
              inventorySelected.sellingPriceInventory *
              (inventorySelected.quantity + 1),
          };
        }

        return inventorySelected;
      });

      setSelectedInventory(updatedInventory);
      setSearch("");
      return;
    }

    setSelectedInventory([...selectedInventory, inventorySelected]);
    setSearch("");
  };

  const handleRemoveInventory = (inventory: IInventoryModelSelected) => {
    setSelectedInventory(
      selectedInventory.filter(
        (inventorySelected) =>
          inventorySelected.inventoryId !== inventory.inventoryId
      )
    );
  };

  const handleAddOrRemoveQuantity = (
    inventory: IInventoryModelSelected,
    action: string
  ) => {
    const updatedInventory = selectedInventory.map((inventorySelected) => {
      if (inventorySelected.inventoryId === inventory.inventoryId) {
        const newQuantity =
          action === "add"
            ? inventorySelected.quantity + 1
            : inventorySelected.quantity - 1;

        return {
          ...inventorySelected,
          quantity: newQuantity,
          subTotal: inventorySelected.sellingPriceInventory * newQuantity,
        };
      }

      return inventorySelected;
    });

    const filtered = updatedInventory.filter(
      (inventorySelected) => inventorySelected.quantity > 0
    );

    setSelectedInventory(filtered);
  };

  useEffect(() => {
    if (search === "") {
      setInventoriesFiltered([]);
      return;
    } else {
      const filtered = inventories.filter((inventory) =>
        inventory.nameInventory.toLowerCase().includes(search.toLowerCase())
      );
      setInventoriesFiltered(filtered);
    }
  }, [search]);

  useEffect(() => {
    dispatch(getInventory());
  }, [dispatch]);

  useEffect(() => {
    console.log(selectedInventory);
    const total = selectedInventory.reduce(
      (acc, inventory) => acc + inventory.subTotal,
      0
    );
    setTotalToPay(total);
  }, [selectedInventory]);

  return (
    <>
      <div className="modal-orders">
        <div className="modal-orders-content">
          <div className="modal-orders-header">
            <h4>Crear una nueva orden</h4>
            <span className="close" onClick={onCloseModal}>
              &times;
            </span>
          </div>
          <p className="form-modal-detail">Detalles de la orden</p>
          <form className="form-modal-orders">
            <div className="modal-order-body">
              <div className="modal-orders-body-left">
                <div className="form-group">
                  <select
                    name="client"
                    id="client"
                    className="modal-orders-client-select"
                  >
                    <option value="">Selecciona un cliente</option>
                    <option value="1">Cliente 1</option>
                    <option value="2">Cliente 2</option>
                    <option value="3">Cliente 3</option>
                  </select>
                </div>
                <div className="form-group">
                  <div className="datetime-container">
                    <select
                      name="paymentType"
                      id="paymentType"
                      className="modal-orders-client-select"
                    >
                      <option value="">Tipo de pago</option>
                      <option value="Efectivo">Efectivo</option>
                      <option value="Transferencia">Transferencia</option>
                      <option value="Cheque">Cheque</option>
                      <option value="Tarjeta de débito">
                        Tarjeta de débito
                      </option>
                      <option value="Tarjeta de crédito">
                        Tarjeta de crédito
                      </option>
                    </select>
                    <select
                      name="orderType"
                      id="orderType"
                      className="modal-orders-client-select"
                    >
                      <option value="">Tipo de orden</option>
                      <option value="Entrega a domicilio">
                        Entrega a domicilio
                      </option>
                      <option value="Entrega en bodega">
                        Entrega en bodega
                      </option>
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-modal-label-detail" htmlFor="date">
                    Fecha y hora de la orden
                  </label>
                  <div className="datetime-container">
                    <input type="date" name="date" id="date" />
                    <input type="time" name="time" id="time" />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-modal-label-detail" htmlFor="date">
                    Estado de la orden
                  </label>
                  <select
                    name="status"
                    id="status"
                    className="modal-orders-client-select"
                  >
                    <option value="1">Pendiente</option>
                    <option value="2">En proceso</option>
                    <option value="3">Entregado</option>
                  </select>
                </div>
                <div className="form-group">
                  <textarea
                    name="notes"
                    id="notes"
                    placeholder="Notas"
                  ></textarea>
                </div>
              </div>
              <div className="modal-orders-body-right">
                <div className="search-bar">
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

                {inventoriesFiltered.length > 0 && search !== "" ? (
                  <FilteredProductList
                    inventoriesFiltered={inventoriesFiltered}
                    handleAddInventory={handleAddInventory}
                  />
                ) : selectedInventory.length > 0 &&
                  search === "" &&
                  inventoriesFiltered.length === 0 ? (
                  <>
                    <SelectedProducts
                      selectedInventory={selectedInventory}
                      handleRemoveInventory={handleRemoveInventory}
                      handleAddOrRemoveQuantity={handleAddOrRemoveQuantity}
                    />
                    <div className="modal-product-selected-total">
                      <p className="modal-product-selected-total-text">Total</p>
                      <p className="modal-product-selected-total-price">
                        {moneyFormat(totalToPay)}
                      </p>
                    </div>
                  </>
                ) : inventoriesFiltered.length === 0 && search !== "" ? (
                  <FilterMessage
                    messageTitle={"No se encontraron productos"}
                    messageParagraph={"Intenta con otro nombre"}
                  />
                ) : (
                  <FilterMessage
                    messageTitle={"Agrega productos a tu orden"}
                    messageParagraph={"Busca y agrega productos a esta orden"}
                  />
                )}
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
                Crear Orden
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
