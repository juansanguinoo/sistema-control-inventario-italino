import { Fragment } from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    borderBottomColor: "#bff0fd",
    borderBottomWidth: 1,
    alignItems: "center",
    height: 24,
    fontStyle: "bold",
    color: "white",
  },
  description: {
    width: "75%",
  },
  qty: {
    width: "10%",
  },
  rate: {
    width: "15%",
  },
  amount: {
    width: "15%",
  },
});

export const InvoiceTableBlankSpace = ({ rowsCount }: any) => {
  const blankRows = Array(rowsCount).fill(0);
  const rows = blankRows.map((_x, i) => (
    <View style={styles.row} key={`BR${i}`}>
      <Text style={styles.rate}>-</Text>
      <Text style={styles.description}>-</Text>
      <Text style={styles.qty}>-</Text>
    </View>
  ));
  return <Fragment>{rows}</Fragment>;
};
