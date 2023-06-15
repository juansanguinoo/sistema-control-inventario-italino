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
import { TableInformation } from "../../components/tables/TableInformation";
import { orderColumns } from "../../utils/columnsDataTable";
import { deleteCategory } from "../../../store/actions/categoryActions";
import { useNavigate } from "react-router-dom";

export const Orders = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const navbarOpen = useSelector(
    (state: RootState) => state.navbarReducer.stateOpen
  );
  const navigate = useNavigate();
  const { orders } = useGetOrders();
  const navbarClass = navbarOpen ? "expanded" : "collapsed";

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handlePreviewAction = (params: any) => {
    navigate(`orderDetail/${params.id}`);
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
          <TableInformation
            categories={orders}
            columns={orderColumns}
            deleteCategory={deleteCategory}
            showDelete={false}
            handlePreviewAction={handlePreviewAction}
          />
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
