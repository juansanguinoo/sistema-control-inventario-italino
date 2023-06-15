import "../styles.css";
import User from "../../../assets/User.svg";
import Bag from "../../../assets/Bag.svg";
import Folder from "../../../assets/Folder.svg";
import { FilterMessage } from "../../orders/components/FilterMessage";
import { LinkButton } from "../../../components/buttons/LinkButton";

export const MainHome = () => {
  return (
    <div className="dashboard">
      <div className="dashboard-column-1">
        <div className="dashboard-cards">
          <div className="dashboard-sales">
            <div className="sales-img">
              <img src={User} alt="" />
            </div>
            <div className="sales-content">
              <div className="sales">
                <h3>Ventas</h3>
                <h4>0.00</h4>
              </div>
              <div className="volume">
                <h3>Volumén</h3>
                <h4>0.00</h4>
              </div>
            </div>
          </div>
          <div className="dashboard-customers">
            <div className="customers-img">
              <img src={User} alt="" />
            </div>
            <div className="customers-content">
              <div className="customers">
                <h3>Clientes</h3>
                <h4>0</h4>
              </div>
              <div className="customers-active">
                <h3>Activos</h3>
                <h4>0</h4>
              </div>
            </div>
          </div>
        </div>
        <div className="dashboard-diagrams">
          <div className="dashboard-cake-diagram"></div>
          <div className="dashboard-cards-2">
            <div className="dashboard-products">
              <div className="products-img">
                <img src={Folder} alt="" />
              </div>
              <div className="products-content">
                <div className="products">
                  <h3>Total productos</h3>
                  <h4>0</h4>
                </div>
                <div className="products-active">
                  <h3>Activos</h3>
                  <h4>0</h4>
                </div>
              </div>
            </div>
            <div className="dashboard-cart"></div>
          </div>
        </div>
        <div className="dashboard-table"></div>
      </div>
      <div className="dashboard-column-2">
        <div className="dashboard-orders">
          <div className="orders-img">
            <img src={Bag} alt="" />
          </div>
          <div className="orders-content">
            <div className="orders">
              <h3>Total ordenes</h3>
              <h4>0</h4>
            </div>
            <div className="pending">
              <h3>Pendientes</h3>
              <h4>0</h4>
            </div>
            <div className="completed">
              <h3>Completadas</h3>
              <h4>0</h4>
            </div>
          </div>
        </div>
        <div className="dashboard-recent-orders">
          <div className="recent-orders">
            <h3>Ordenes recientes</h3>
          </div>
          <div className="recent-orders-noorders">
            <FilterMessage
              messageTitle={"¿No tienes ordenes aún?"}
              messageParagraph={"Agrega productos a tu tienda y crea ordenes."}
            />
            <div className="recent-orders-add-products">
              <LinkButton title="Agregar productos" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
