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
    width: "75%",
    textAlign: "center",
    paddingLeft: 8,
  },
  qty: {
    width: "10%",
    textAlign: "center",
    paddingRight: 8,
  },
  rate: {
    width: "15%",
    textAlign: "center",
    paddingRight: 8,
  },
});

export const InvoiceTableRow = ({ items }: any) => {
  const rows = items.map((item: any) => (
    <View style={styles.row} key={item.sno.toString()}>
      <Text style={styles.rate}>{item.ref}</Text>
      <Text style={styles.description}>{item.desc}</Text>
      <Text style={styles.qty}>{item.qty}</Text>
    </View>
  ));
  return <Fragment>{rows}</Fragment>;
};
