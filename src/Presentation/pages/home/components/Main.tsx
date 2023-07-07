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
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { useState, useEffect } from "react";

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
  const totalOrders = useSelector(
    (state: RootState) => state.orderReducer.orders
  );
  const [orderTotalByMonth, orderTotalByYear] = useState<any>([]);
  const [productsMostSoldLabel, setProductsMostSoldLabel] = useState<any>([]);
  const [productsMostSoldData, setProductsMostSoldData] = useState<any>([]);

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

  useEffect(() => {
    // get just the top 5 products most sold from totalOrders.orderDetails.quantity is the quantity of the product and totalOrders.orderDetails.inventory.name_inventory is the product

    const products = totalOrders.map((order) => {
      return order.orderDetails?.map((detail: any) => {
        return {
          name: detail.inventory.name_inventory,
          quantity: detail.quantity,
        };
      });
    });

    const productsFlatten = products.flat();

    const productsGrouped = productsFlatten.reduce((acc, curr) => {
      if (acc[curr.name]) {
        acc[curr.name] += curr.quantity;
      } else {
        acc[curr.name] = curr.quantity;
      }
      return acc;
    }, {});

    const productsSorted = Object.entries(productsGrouped).sort(
      (a: any, b: any) => b[1] - a[1]
    );

    const productsMostSold = productsSorted.slice(0, 5);

    const productsMostSoldLabel = productsMostSold.map((product: any) => {
      return product[0].length > 30
        ? product[0].slice(0, 30) + "..."
        : product[0];
    });

    const productsMostSoldData = productsMostSold.map((product: any) => {
      return product[1];
    });

    setProductsMostSoldLabel(productsMostSoldLabel);
    setProductsMostSoldData(productsMostSoldData);
  }, [totalOrders]);

  useEffect(() => {
    const totalOrdersByMonth = months.map((month) => {
      const filteredOrders = totalOrders.filter((order) => {
        const date = new Date(order.createdAt);
        return date.toLocaleString("es-MX", { month: "long" }) === month;
      });
      if (filteredOrders.length > 0) {
        return filteredOrders.reduce((a, b) => a + b.totalOrder, 0);
      } else {
        return 0;
      }
    });

    orderTotalByYear(totalOrdersByMonth);
  }, [totalOrders]);

  const data = {
    labels: productsMostSoldLabel,
    datasets: [
      {
        label: "# of Votes",
        data: productsMostSoldData,
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

  const dataTable = {
    labels,
    datasets: [
      {
        label: "Ventas por mes",
        data: orderTotalByMonth,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
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
          <div className="dashboard-custom">
            <div className="custom-img">
              <img src={Bag} alt="" />
            </div>
            <div className="custom-content">
              <div className="custom">
                <h3>Total ordenes</h3>
                <h4>{orders.length}</h4>
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
