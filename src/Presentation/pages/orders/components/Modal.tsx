import SearchIcon from "../../../assets/icons8-search.svg";
import { ChangeEvent, useEffect, useState } from "react";
import { InventoryModel } from "../../../../domain/models/InventoryModel";
import { FilteredProductList } from "./FilteredProductList";
import { SelectedProducts } from "./SelectedProducts";
import { FilterMessage } from "./FilterMessage";
import { IInventoryModelSelected } from "../../../interfaces/IInventoryModelSelected";
import { useGetCustomerByUser } from "../../../hooks/useGetCustomerByUser";
import { OrderRequest } from "../../../../domain/models/OrderRequest";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import {
  createOrder,
  updateOrder,
} from "../../../../store/actions/orderActions";
import Swal from "sweetalert2";
import { RootState } from "../../../../store/store";
import { getInventoryByNameOrRefrence } from "../../../../store/actions/inventoryActions";

interface IModalOrdersProps {
  onCloseModal?: () => void;
  initialData?: OrderRequest;
  initialSelectedValues?: IInventoryModelSelected[];
  isEdit?: boolean;
}

export const ModalOrders = ({
  onCloseModal,
  initialData,
  initialSelectedValues = [],
  isEdit = false,
}: IModalOrdersProps) => {
  const dispatch = useDispatch<Dispatch<any>>(); // eslint-disable-line
  const { customers, getUser } = useGetCustomerByUser();
  const [search, setSearch] = useState<string>("");
  const [inventoriesFiltered, setInventoriesFiltered] = useState<
    InventoryModel[]
  >([]);
  const [selectedInventory, setSelectedInventory] = useState<
    IInventoryModelSelected[]
  >(initialSelectedValues);
  const [isQuantityInputFocused, setIsQuantityInputFocused] = useState(false);
  const [dataToSend, setDataToSend] = useState<OrderRequest>({
    id: initialData?.id || 0,
    customerId: initialData?.customerId || 0,
    userId: initialData?.userId || getUser?.id!,
    statusOrder: initialData?.statusOrder || "Pendiente",
    paymentOrder: initialData?.paymentOrder || "",
    typeOrder: initialData?.typeOrder || "",
    totalOrder: initialData?.totalOrder || 0,
    orderDetails: initialData?.orderDetails || [],
  });
  const inventoryByNameOrReference = useSelector(
    (state: RootState) => state.inventoryReducer.inventoryByNameOrReference
  );

  useEffect(() => {
    console.log(selectedInventory);
    console.log(search);
  }, [selectedInventory, search]);

  const moneyFormat = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  };

  const handleAddInventory = (inventory: InventoryModel) => {
    console.log(inventory);
    const inventorySelected: IInventoryModelSelected = {
      inventoryId: inventory.id!,
      nameInventory: inventory.nameInventory,
      imageInventory: inventory.imageInventory!,
      sellingPriceInventory: inventory.sellingPriceInventory,
      stockInventory: inventory.stockInventory,
      quantity: 1,
      subTotal: inventory.sellingPriceInventory,
    };

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

  const handleAddOrRemoveQuantityByInput = (
    inventory: IInventoryModelSelected,
    quantity: string
  ) => {
    const updatedInventory = selectedInventory.map((inventorySelected) => {
      if (inventorySelected.inventoryId === inventory.inventoryId) {
        return {
          ...inventorySelected,
          quantity: quantity ? parseInt(quantity) : 0,
          subTotal:
            inventorySelected.sellingPriceInventory *
            (quantity ? parseInt(quantity) : 0),
        };
      }

      return inventorySelected;
    });

    setSelectedInventory(updatedInventory);
  };

  const handleQuantityInputFocus = (value: boolean) => {
    setIsQuantityInputFocused(value);
  };

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    if (name === "customerId") {
      setDataToSend((prevData) => ({
        ...prevData,
        [name]: parseInt(value),
      }));
    } else {
      setDataToSend((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSendOrder = (e: any) => {
    e.preventDefault();
    if (
      dataToSend.customerId === 0 ||
      dataToSend.paymentOrder === "" ||
      dataToSend.typeOrder === ""
    ) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Por favor completa todos los campos",
      });
    } else if (dataToSend.orderDetails.length === 0) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Por favor agrega al menos un producto",
      });
    } else if (
      selectedInventory.some(
        (inventory) => inventory.quantity > inventory.stockInventory
      )
    ) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "La cantidad de productos no puede ser mayor al stock",
      });
    } else {
      Swal.fire({
        title: "¿Estás seguro?",
        text: "Una vez confirmado no podrás modificar la orden",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
      }).then((result) => {
        if (result.isConfirmed) {
          if (isEdit) {
            dispatch(updateOrder(dataToSend));
          } else {
            dispatch(createOrder(dataToSend));
          }
          onCloseModal!();
        }
      });
    }
  };

  useEffect(() => {
    if (search === "") {
      setInventoriesFiltered([]);
      return;
    } else {
      const filtered = inventoryByNameOrReference.filter(
        (inventory) =>
          inventory.nameInventory
            .toLowerCase()
            .includes(search.toLowerCase()) &&
          inventory.statusInventory === "Activo"
      );
      setInventoriesFiltered(filtered);
    }
  }, [inventoryByNameOrReference, search]);

  const handleSearch = () => {
    dispatch(getInventoryByNameOrRefrence(search));
  };

  useEffect(() => {
    const total = selectedInventory.reduce(
      (acc, inventory) => acc + inventory.subTotal,
      0
    );
    setDataToSend((prevData) => ({
      ...prevData,
      totalOrder: total,
      orderDetails: selectedInventory.map((inventory) => ({
        inventoryId: inventory.inventoryId,
        quantity: inventory.quantity,
      })),
    }));
  }, [selectedInventory]);

  useEffect(() => {
    if (!isQuantityInputFocused) {
      const filtered = selectedInventory.filter(
        (inventorySelected) => inventorySelected.quantity > 0
      );
      setSelectedInventory(filtered);
    }
  }, [isQuantityInputFocused]);

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
          <form className="form-modal-orders" onSubmit={handleSendOrder}>
            <div className="modal-order-body">
              <div className="modal-orders-body-left">
                <div className="form-group">
                  <select
                    name="customerId"
                    id="client"
                    className="modal-orders-client-select"
                    onChange={handleSelectChange}
                    value={dataToSend.customerId}
                  >
                    <option value="">Selecciona un cliente</option>
                    {customers.map((customer) => (
                      <option key={customer.id} value={customer.id}>
                        {customer.nameCustomer}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <div className="datetime-container">
                    <select
                      name="paymentOrder"
                      id="paymentType"
                      className="modal-orders-client-select"
                      onChange={handleSelectChange}
                      value={dataToSend.paymentOrder}
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
                      name="typeOrder"
                      id="orderType"
                      className="modal-orders-client-select"
                      onChange={handleSelectChange}
                      value={dataToSend.typeOrder}
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
                    name="statusOrder"
                    id="status"
                    className="modal-orders-client-select"
                    onChange={handleSelectChange}
                    value={dataToSend.statusOrder}
                  >
                    <option value="Pendiente">Pendiente</option>
                    <option value="Entregado">Entregado</option>
                    <option value="Salida">Salida</option>
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
                    readOnly={isEdit}
                  />
                  <div className="search-button" onClick={handleSearch}>
                    <img src={SearchIcon} alt="search" />
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
                      handleAddOrRemoveQuantityByInput={
                        handleAddOrRemoveQuantityByInput
                      }
                      handleQuantityInputFocus={handleQuantityInputFocus}
                      isEdit={isEdit}
                    />
                    <div className="modal-product-selected-total">
                      <p className="modal-product-selected-total-text">Total</p>
                      <p className="modal-product-selected-total-price">
                        {moneyFormat(dataToSend.totalOrder)}
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
              {initialData?.statusOrder === "Cancelado" ? null : (
                <button type="submit" className="add-button">
                  {isEdit ? "Editar orden" : "Crear orden"}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
