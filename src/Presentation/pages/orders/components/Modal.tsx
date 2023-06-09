import SearchIcon from "../../../assets/icons8-search.svg";

interface IModalOrdersProps {
  onCloseModal?: () => void;
}

export const ModalOrders = ({ onCloseModal }: IModalOrdersProps) => {
  return (
    <div>
      <div className="modal-orders">
        <div className="modal-orders-content">
          <div className="modal-orders-header">
            <h4>Crear una nueva ordén</h4>
            <span className="close" onClick={onCloseModal}>
              &times;
            </span>
          </div>
          <form className="form-modal-orders">
            <div className="modal-order-body">
              <div className="modal-orders-body-left">
                <div className="form-group">
                  <input
                    type="number"
                    name="referency"
                    id="referency"
                    placeholder="Numero de pedido"
                  />
                </div>
                <div className="form-group">
                  <select name="client" id="client">
                    <option value="1">Cliente 1</option>
                    <option value="2">Cliente 2</option>
                    <option value="3">Cliente 3</option>
                  </select>
                </div>
                <div className="form-group">
                  <input type="date" name="date" id="date" />
                </div>
                <div className="form-group">
                  <select name="status" id="status">
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
                  />
                  <button className="search-button">
                    <img src={SearchIcon} alt="" />
                  </button>
                </div>
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
                Guardar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
