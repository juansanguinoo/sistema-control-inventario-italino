import "./styles.css";
import Bag from "../../assets/Bag.svg";
import { useSelector } from "react-redux";
import { CardInformation } from "../../components/cards/CardInformation";
import { PageTitle } from "../../components/titles/PageTitle";
import { RootState } from "../../../store/store";
import { HeaderButton } from "../../components/buttons/HeaderButton";
import { useState } from "react";
import { ModalOrders } from "./components/Modal";

export const Orders = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const navbarOpen = useSelector(
    (state: RootState) => state.navbarReducer.stateOpen
  );
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
        {showModal && <ModalOrders onCloseModal={closeModal} />}
      </div>
    </div>
  );
};
