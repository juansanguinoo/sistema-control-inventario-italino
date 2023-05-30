export const ModalCategory = () => {
  return (
    <div>
      <div className="modal">
        <div className="modal-content">
          <div className="modal-header">
            <h4>Agregar Categoría</h4>
            <span className="close">&times;</span>
          </div>
          <form>
            <div className="form-group">
              <label htmlFor="categoryName">Nombre de la categoría:</label>
              <input type="text" id="categoryName" required />
            </div>
            <div className="form-group">
              <label htmlFor="categoryReference">
                Referencia de la categoría:
              </label>
              <input type="number" id="categoryReference" required />
            </div>
            <div className="form-group">
              <label htmlFor="btn-switch-active-category">
                Status del producto
              </label>
              <input type="checkbox" id="btn-switch-active-category" />
              <label
                htmlFor="btn-switch-active-category"
                className="lbl-switch-active-category"
              ></label>
            </div>
            <div className="modal-footer">
              <button type="button" className="cancel-button">
                Cancelar
              </button>
              <button type="submit" className="add-button">
                Agregar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
