import "./styles.css";
import Bag from "../../assets/Bag.svg";
import { useSelector } from "react-redux";
import { CardInformation } from "../../components/cards/CardInformation";
import { PageTitle } from "../../components/titles/PageTitle";
import { RootState } from "../../../store/store";
import { HeaderButton } from "../../components/buttons/HeaderButton";
import { useState } from "react";
import { ModalOrders } from "./components/Modal";
import { useGetOrders } from "../../hooks/useGetOrders";
import { FilterMessage } from "./components/FilterMessage";

export const Orders = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const navbarOpen = useSelector(
    (state: RootState) => state.navbarReducer.stateOpen
  );
  const { orders } = useGetOrders();
  const navbarClass = navbarOpen ? "expanded" : "collapsed";

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className={`orders-container ${navbarClass}`}>
      <div className="orders-header">
        <PageTitle title="Ordenes" />
        <HeaderButton
          title="Crear una nueva orden"
          handleFunction={openModal}
        />
      </div>
      <div className="orders-main">
        <CardInformation icon={Bag} />
        <CardInformation icon={Bag} />
        {orders.length > 0 ? (
          <div>Tabla</div>
        ) : (
          <div className="orders-noorders">
            <FilterMessage
              messageTitle={"¿No tienes ordenes aún?"}
              messageParagraph={"Una vez crees ordenes, las podrás ver aquí."}
            />
            <div className="order-add-order">
              <HeaderButton
                title="Crear una nueva orden"
                handleFunction={openModal}
              />
            </div>
          </div>
        )}
        {showModal && <ModalOrders onCloseModal={closeModal} />}
      </div>
    </div>
  );
};
