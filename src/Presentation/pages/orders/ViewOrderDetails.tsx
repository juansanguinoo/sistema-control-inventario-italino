import { HeaderButton } from "../../components/buttons/HeaderButton";
import { PageTitle } from "../../components/titles/PageTitle";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { TableInformation } from "../../components/tables/TableInformation";
import { useGetOrders } from "../../hooks/useGetOrders";
import { orderDetailColumns } from "../../utils/columnsDataTable";
import { deleteCategory } from "../../../store/actions/categoryActions";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { OrderResponseModel } from "../../../domain/models/OrderResponseModel";
import { CardInformation } from "../../components/cards/CardInformation";
import ClientIcon from "../../assets/userClientIcon.svg";
import { Customer } from "../../../domain/models/Customer";
import LocationClientIcon from "../../assets/iconText.svg";
import { HeaderButtonEnum } from "../../enums/HeaderButtonEmun";
import Swal from "sweetalert2";
import { Dispatch } from "redux";
import { updateOrder } from "../../../store/actions/orderActions";
import { OrderRequest } from "../../../domain/models/OrderRequest";
import { ModalReturns } from "./components/ModalReturns";
import { ReportPDF } from "./components/Report/ReportPDF";
import { PDFDownloadLink } from "@react-pdf/renderer";
import moment from "moment";
import { Button } from "@mui/material";
import { ReportBillPDF } from "./components/Report/ReportBillPDF";

const moneyFormat = (value: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
};

export const ViewOrderDetails = () => {
  const dispatch = useDispatch<Dispatch<any>>(); // eslint-disable-line
  const navbarOpen = useSelector(
    (state: RootState) => state.navbarReducer.stateOpen
  );
  const { orders } = useGetOrders();
  const params = useParams();
  const [orderData, setOrderData] = useState<OrderResponseModel>();
  const [customer, setCustomer] = useState<Customer>();
  const [returnModal, setReturnModal] = useState<boolean>(false);
  const [invoiceData, setInvoiceData] = useState<any>(null);
  const navigate = useNavigate();

  const navbarClass = navbarOpen ? "expanded" : "collapsed";

  const getOrderById = () => {
    const orderFilter = orders.find(
      (order: any) => order.id === Number(params.id)
    );
    if (orderFilter) {
      setOrderData(orderFilter);
    }
  };

  const handleCancelOrder = () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Una vez eliminado, no podrás recuperar esta orden.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        const orderUpdates: OrderRequest = {
          id: orderData?.id!,
          customerId: orderData?.customer.id_customer,
          userId: orderData?.user.id_user,
          statusOrder: "Cancelado",
          paymentOrder: orderData?.paymentOrder!,
          typeOrder: orderData?.typeOrder!,
          totalOrder: orderData?.totalOrder!,
          orderDetails: orderData?.orderDetails,
        };
        dispatch(updateOrder(orderUpdates));
        Swal.fire(
          "Eliminado",
          "El producto ha sido eliminado exitosamente.",
          "success"
        ).then(() => {
          navigate(-1);
        });
      }
    });
  };

  const openModal = () => {
    setReturnModal(true);
  };

  const closeModal = () => {
    setReturnModal(false);
  };

  useEffect(() => {
    if (params.id) {
      getOrderById();
    }
    const customerFilter = orderData?.customer;
    if (customerFilter) {
      setCustomer(customerFilter);
    }
  }, [orders]);

  useEffect(() => {
    const invoice = {
      id: "5df3180a09ea16dc4b95f910",
      invoice_no: orderData?.referenceOrder,
      company: customer?.name_customer,
      email: customer?.email_customer,
      phone: customer?.phone_customer,
      address: customer?.address_customer,
      trans_date: moment(orderData?.createdAt).format("DD/MM/YYYY"),
      items: orderData?.orderDetails?.map((item: any, index: number) => {
        return {
          sno: index + 1,
          ref: item?.inventory?.reference_inventory,
          desc: "Descripción del producto",
          qty: item?.quantity,
          rate: item?.inventory?.selling_price_inventory,
        };
      }),
    };

    setInvoiceData(invoice);
  }, [orderData, customer]);

  return (
    <div className={`orders-container ${navbarClass}`}>
      <div className="orders-header">
        <PageTitle title="Ordenes" />
        <div className="orders-header-buttons">
          {invoiceData?.company &&
          invoiceData?.invoice_no &&
          customer &&
          orderData ? (
            <PDFDownloadLink
              document={<ReportBillPDF invoice={invoiceData} />}
              fileName="orden.pdf"
            >
              <Button variant="outlined" size="small">
                PDF Reporte
              </Button>
            </PDFDownloadLink>
          ) : null}
          {invoiceData?.company &&
          invoiceData?.invoice_no &&
          customer &&
          orderData ? (
            <PDFDownloadLink
              document={<ReportPDF invoice={invoiceData} />}
              fileName="orden.pdf"
            >
              <Button variant="outlined" size="small">
                PDF Producción
              </Button>
            </PDFDownloadLink>
          ) : null}
          <HeaderButton
            title="Devoluciones"
            handleFunction={openModal}
            typeButton={HeaderButtonEnum.update}
          />
          <HeaderButton
            title="Cancelar orden"
            handleFunction={handleCancelOrder}
            typeButton={HeaderButtonEnum.cancel}
          />
        </div>
      </div>
      <div className="orders-main">
        <CardInformation
          icon={ClientIcon}
          titles={["Telefono", "Correo", "Dirección del cliente"]}
          data={[
            customer?.phone_customer,
            customer?.email_customer,
            customer?.address_customer,
          ]}
        />
        <CardInformation
          icon={LocationClientIcon}
          titles={["Total productos", "Total a pagar", "Estado de la orden"]}
          data={[
            orderData?.orderDetails.length,
            moneyFormat(orderData?.totalOrder!),
            orderData?.statusOrder,
          ]}
        />
        <TableInformation
          categories={orderData?.orderDetails}
          columns={orderDetailColumns}
          deleteCategory={deleteCategory}
          showActions={false}
        />
        {returnModal && (
          <ModalReturns onCloseModal={closeModal} orderData={orderData!} />
        )}
      </div>
    </div>
  );
};
