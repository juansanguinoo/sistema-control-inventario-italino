import { View, StyleSheet } from "@react-pdf/renderer";
import { InvoiceTableBlankSpace } from "./InvoiceTableBlankSpace";
import { InvoiceTableFooter } from "./InvoiceTableFooter";
import { InvoiceBillTableHeader } from "./InvoiceBillTableHeader";
import { InvoiceBillTableRow } from "./InvoiceBillTableRow";

const tableRowsCount = 11;

const styles = StyleSheet.create({
  tableContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 24,
    borderWidth: 1,
    borderColor: "#bff0fd",
  },
});

export const InvoiceItemsBillTable = ({ invoice }: any) => (
  <View style={styles.tableContainer}>
    <InvoiceBillTableHeader />
    <InvoiceBillTableRow items={invoice.items} />
    <InvoiceTableBlankSpace rowsCount={tableRowsCount - invoice.items.length} />
    <InvoiceTableFooter items={invoice.items} />
  </View>
);
