import { View, Text, StyleSheet } from "@react-pdf/renderer";

type InvoiceDetailsProps = {
  number: string | number;
  date: string;
  poNumber: string;
  dueDate: string;
};

function InvoiceDetails({
  number,
  date,
  poNumber,
  dueDate,
}: InvoiceDetailsProps) {
  const style = StyleSheet.create({
    invoiceDetailsContainer: {
      textTransform: "capitalize",
      display: "flex",
      flexDirection: "column",
      gap: 10,
    },
    itemContainer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      gap: 70,
    },
  });
  return (
    <View style={style.invoiceDetailsContainer}>
      <View style={style.itemContainer}>
        <Text>INVOICE NO.</Text>
        <Text>{number}</Text>
      </View>
      <View style={style.itemContainer}>
        <Text>INVOICE DATE</Text>
        <Text>{date}</Text>
      </View>
      <View style={style.itemContainer}>
        <Text>P.O #</Text>
        <Text>{poNumber}</Text>
      </View>
      <View style={style.itemContainer}>
        <Text>DUE DATE</Text>
        <Text>{dueDate}</Text>
      </View>
    </View>
  );
}

export default InvoiceDetails;
