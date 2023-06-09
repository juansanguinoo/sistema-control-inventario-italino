import { useSelector } from "react-redux";
import { CardInformation } from "../../components/cards/CardInformation";
import { TableInformation } from "../../components/tables/TableInformation";
import { PageTitle } from "../../components/titles/PageTitle";
import "./styles.css";
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
          title="Crear una nueva ordén"
          handleFunction={openModal}
        />
      </div>
      <div className="orders-main">
        <CardInformation />
        <CardInformation />
        {showModal && <ModalOrders onCloseModal={closeModal} />}
      </div>
    </div>
  );
};
