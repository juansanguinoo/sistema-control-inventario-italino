import "../styles.css";
import User from "../../../assets/User.svg";
import Bag from "../../../assets/Bag.svg";
import Folder from "../../../assets/Folder.svg";
import { FilterMessage } from "../../orders/components/FilterMessage";
import { LinkButton } from "../../../components/buttons/LinkButton";
import { useGetInventory } from "../../../hooks/useGetInventory";
import { useGetInventoryInformation } from "../../../hooks/useGetInventoryInformation";
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
import { faker } from "@faker-js/faker";

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
  const data = {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [
      {
        label: "# of Votes",
        data: [12, 19, 3, 5, 2, 3],
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
        text: "Chart.js Bar Chart",
      },
    },
  };

  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dataTable = {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Dataset 2",
        data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  const { inventories } = useGetInventory();
  const { activeProducts } = useGetInventoryInformation();
  const { customers, activeCustomers } = useGetCustomerInformation();
  const { orders } = useGetOrders();

  // get all th active orders
  const completedOrders = orders.filter(
    (order) => order.statusOrder === "Entregado"
  );

  // get all the pending orders
  const pendingOrders = orders.filter(
    (order) => order.statusOrder === "Pendiente"
  );

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
                <h4>{customers.length}</h4>
              </div>
              <div className="customers-active">
                <h3>Activos</h3>
                <h4>{activeCustomers.length}</h4>
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
                  <h4>{inventories.length}</h4>
                </div>
                <div className="products-active">
                  <h3>Activos</h3>
                  <h4>{activeProducts.length}</h4>
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
                  <h4>{inventories.length}</h4>
                </div>
                <div className="products-active">
                  <h3>Activos</h3>
                  <h4>{activeProducts.length}</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="dashboard-table">
          <Bar options={options} data={dataTable} />;
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
              <h4>{orders.length}</h4>
            </div>
            <div className="pending">
              <h3>Pendientes</h3>
              <h4>{pendingOrders.length}</h4>
            </div>
            <div className="completed">
              <h3>Completadas</h3>
              <h4>{completedOrders.length}</h4>
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
