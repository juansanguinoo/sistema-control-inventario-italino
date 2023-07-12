import { Document, Page, StyleSheet } from "@react-pdf/renderer";
import { InvoiceTitle } from "./InvoiceTitle";
import { InvoiceNo } from "./InvoiceNo";
// import { BillTo } from "./BillTo";
import { InvoiceItemsTable } from "./InvoiceItemsTable";
import { InvoiceThankYouMsg } from "./InvoiceThankYouMsg";

export const ReportPDF = ({ invoice }: any) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* <Image style={styles.logo} src={logo} /> */}
        <InvoiceTitle title="Reporte ITALINO" />
        <InvoiceNo invoice={invoice} />
        {/* <BillTo invoice={invoice} /> */}
        <InvoiceItemsTable invoice={invoice} />
        <InvoiceThankYouMsg />
      </Page>
    </Document>
  );
};

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 11,
    paddingTop: 30,
    paddingLeft: 60,
    paddingRight: 60,
    lineHeight: 1.5,
    flexDirection: "column",
  },
  logo: {
    width: 74,
    height: 66,
    marginLeft: "auto",
    marginRight: "auto",
  },
});
