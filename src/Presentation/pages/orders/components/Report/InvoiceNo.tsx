import { Fragment } from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  invoiceNoContainer: {
    flexDirection: "row",
    marginTop: 36,
    justifyContent: "flex-end",
  },
  invoiceDateContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  invoiceDate: {
    fontSize: 12,
    fontStyle: "bold",
    minWidth: 66,
    maxWidth: 66,
    right: 0,
    textAlign: "right",
  },
  label: {
    minWidth: 64,
    maxWidth: 64,
  },
});

export const InvoiceNo = ({ invoice }: any) => (
  <Fragment>
    <View style={styles.invoiceNoContainer}>
      <Text style={styles.label}>Reporte No:</Text>
      <Text style={styles.invoiceDate}>{invoice.invoice_no}</Text>
    </View>
    <View style={styles.invoiceDateContainer}>
      <Text style={styles.label}>Fecha: </Text>
      <Text style={styles.invoiceDate}>{invoice.trans_date}</Text>
    </View>
  </Fragment>
);
