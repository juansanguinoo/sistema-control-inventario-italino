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
  },
  description: {
    width: "60%",
    textAlign: "left",
    paddingLeft: 8,
  },
  qty: {
    width: "10%",
    textAlign: "right",
    paddingRight: 8,
  },
  rate: {
    width: "15%",
    textAlign: "right",
    paddingRight: 8,
  },
  amount: {
    width: "15%",
    textAlign: "right",
    paddingRight: 8,
  },
});

export const InvoiceBillTableRow = ({ items }: any) => {
  const rows = items.map((item: any) => (
    <View style={styles.row} key={item.sno.toString()}>
      <Text style={styles.description}>{item.ref}</Text>
      <Text style={styles.qty}>{item.qty}</Text>
      <Text style={styles.rate}>{item.rate}</Text>
      <Text style={styles.amount}>{(item.qty * item.rate).toFixed(2)}</Text>
    </View>
  ));
  return <Fragment>{rows}</Fragment>;
};
