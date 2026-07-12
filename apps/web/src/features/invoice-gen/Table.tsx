import { View, Text, StyleSheet } from "@react-pdf/renderer";

type TableRowType = {
  qty: number;
  description: string;
  unitPrice: number;
};

type TableProps = {
  items: TableRowType[];
};

function TableColumns() {
  const styles = StyleSheet.create({
    itemsColumns: {
      padding: 10,
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      fontSize: 14,
      fontWeight: 600,
      borderBottomColor: "#000000",
      borderBottomWidth: 2,
      borderTopColor: "#000000",
      borderTopWidth: 2,
      textAlign: "center",
    },
  });

  return (
    <View style={styles.itemsColumns}>
      <Text>QTY</Text>
      <Text>DESCRIPTION</Text>
      <Text>UNIT PRICE</Text>
      <Text>AMOUNT</Text>
    </View>
  );
}

function TableRow({ qty, description, unitPrice }: TableRowType) {
  const style = StyleSheet.create({
    itemContainer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      fontSize: 12,

      padding: 10,
    },
    qty: {
      textAlign: "center",
      width: 30,
    },
    description: {
      textAlign: "left",
      width: 100,
    },
    amounts: {
      width: 50,
      textAlign: "right",
    },
  });
  return (
    <View style={style.itemContainer}>
      <Text style={style.qty}>{qty}</Text>
      <Text style={style.description}>{description}</Text>
      <Text style={style.amounts}>{unitPrice}</Text>
      <Text style={style.amounts}> {qty * unitPrice}</Text>
    </View>
  );
}

function Table({ items }: TableProps) {
  return (
    <View>
      <TableColumns />
      {items.map((item) => (
        <TableRow {...item} key={item.description} />
      ))}
    </View>
  );
}

export default Table;
