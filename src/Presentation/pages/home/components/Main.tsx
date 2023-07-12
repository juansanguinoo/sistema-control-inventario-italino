import "../styles.css";
import User from "../../../assets/User.svg";
import Bag from "../../../assets/Bag.svg";
import Folder from "../../../assets/Folder.svg";
import { FilterMessage } from "../../orders/components/FilterMessage";
import { LinkButton } from "../../../components/buttons/LinkButton";
import { useGetCustomerInformation } from "../../../hooks/useGetCustomerInformation";
import { useGetOrders } from "../../../hooks/useGetOrders";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";
import { Pie } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";
import { useGetInventoryInfo } from "../../../hooks/useGetInventoryInfo";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

export const MainHome = () => {
  const { inventoryInfo } = useGetInventoryInfo();
  const { customerInfo } = useGetCustomerInformation();
  const { orders, ordersInfo } = useGetOrders();

  const months = [
    "enero",
    "febrero",
    "marzo",
    "abril",
    "mayo",
    "junio",
    "julio",
    "agosto",
    "septiembre",
    "octubre",
    "noviembre",
    "diciembre",
  ];

  const data = {
    labels: ordersInfo?.productsMostSold.map((product) => product.reference),
    datasets: [
      {
        label: "# de compras",
        data: ordersInfo?.productsMostSold.map((product) => product.total),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Grafica de ventas por mes",
      },
    },
  };

  const labels = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiempre",
    "Octubre",
    "Noviembre",
    "Dicembre",
  ];

  const soldsByMonthMap: any = {};
  ordersInfo?.soldsByMonth.forEach((item: any) => {
    soldsByMonthMap[item.month] = item.total;
  });

  const soldsByMonthWithNames = [];
  for (let i = 1; i <= 12; i++) {
    const monthName = months[i - 1];
    const total = soldsByMonthMap[i] || 0;
    soldsByMonthWithNames.push({
      month: monthName,
      total: total,
    });
  }

  const dataTable = {
    labels,
    datasets: [
      {
        label: "Ventas por mes",
        data: soldsByMonthWithNames.map((item: any) => item.total),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <>
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
                  <h4>{customerInfo?.totalCustomers}</h4>
                </div>
                <div className="customers-active">
                  <h3>Activos</h3>
                  <h4>{customerInfo?.activeCustomers}</h4>
                </div>
              </div>
            </div>
          </div>
          <div className="dashboard-diagrams">
            <div className="dashboard-cake-diagram">
              <Pie data={data} />
            </div>
            <div className="dashboard-cards-2">
              <div className="dashboard-products">
                <div className="products-img">
                  <img src={Folder} alt="" />
                </div>
                <div className="products-content">
                  <div className="products">
                    <h3>Total productos</h3>
                    <h4>{inventoryInfo?.totalInventories}</h4>
                  </div>
                  <div className="products-active">
                    <h3>Activos</h3>
                    <h4>{inventoryInfo?.activeInventories}</h4>
                  </div>
                </div>
              </div>
              <div className="dashboard-cart">
                <div className="products-img">
                  <img src={Folder} alt="" />
                </div>
                <div className="products-content">
                  <div className="products">
                    <h3>Total productos</h3>
                    <h4>{inventoryInfo?.totalInventories}</h4>
                  </div>
                  <div className="products-active">
                    <h3>Activos</h3>
                    <h4>{inventoryInfo?.activeInventories}</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="dashboard-custom">
            <div className="custom-img">
              <img src={Bag} alt="" />
            </div>
            <div className="custom-content">
              <div className="custom">
                <h3>Total ordenes</h3>
                <h4>{ordersInfo?.totalOrders}</h4>
              </div>
            </div>
          </div>
        </div>
        <div className="dashboard-column-2">
          <div className="dashboard-orders">
            <div className="orders-img">
              <img src={Bag} alt="" />
            </div>
            <div className="orders-content">
              <div className="orders">
                <h3>Total ordenes</h3>
                <h4>{ordersInfo?.totalOrders}</h4>
              </div>
              <div className="pending">
                <h3>Pendientes</h3>
                <h4>{ordersInfo?.totalOrdersInProcess}</h4>
              </div>
              <div className="completed">
                <h3>Completadas</h3>
                <h4>{ordersInfo?.totalOrdersDelivered}</h4>
              </div>
            </div>
          </div>
          <div className="dashboard-recent-orders">
            <div className="recent-orders">
              <h3>Ordenes recientes</h3>
            </div>
            {orders.length > 0 ? (
              <>
                <ul>
                  {orders.map((order) => (
                    <li key={order.id}>
                      <div className="recent-orders-content">
                        <div className="column-recent-order">
                          <div className="recent-orders-name">
                            <h3>{order.user.name_user}</h3>
                          </div>
                          <div className="recent-orders-total">
                            <h4>Total $ {order.totalOrder}</h4>
                          </div>
                        </div>
                        <div
                          className={`recent-orders-status ${
                            order.statusOrder === "Completado"
                              ? "complete-order"
                              : order.statusOrder === "En-proceso"
                              ? "in-progress-order"
                              : order.statusOrder === "Cancelado"
                              ? "canceled-order"
                              : "pending-order"
                          }`}
                        >
                          <h5>{order.statusOrder}</h5>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <>
                <div className="recent-orders-noorders">
                  <FilterMessage
                    messageTitle={"¿No tienes ordenes aún?"}
                    messageParagraph={
                      "Agrega productos a tu tienda y crea ordenes."
                    }
                  />
                  <div className="recent-orders-add-products">
                    <LinkButton title="Agregar productos" />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="dashboard-table-container">
        <div className="dashboard-table">
          <Bar options={options} data={dataTable} />;
        </div>
      </div>
    </>
  );
};
