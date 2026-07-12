import { View, Text, StyleSheet } from "@react-pdf/renderer";

type TotalsProps = {
  subTotal?: number;
  postTaxAmount?: number;
  taxRate?: number;
  discountRate?: number;
  postDiscountAmount?: number;
  total: number;
};

type TotalsItemProps = {
  headText: string;
  amountText: number | string;
};

function TotalsItem({ headText, amountText }: TotalsItemProps) {
  const style = StyleSheet.create({
    totalItemContainer: {
      display: "flex",
      flexDirection: "row",
      gap: 50,
      justifyContent: "flex-end",
    },
  });
  return (
    <View style={style.totalItemContainer}>
      <Text>{headText}</Text>
      <Text>{amountText}</Text>
    </View>
  );
}

function Totals({
  subTotal,
  postTaxAmount,
  taxRate,
  discountRate,
  postDiscountAmount,
  total,
}: TotalsProps) {
  const style = StyleSheet.create({
    totalsContainer: {
      marginRight: 10,
    },
  });
  return (
    <View style={style.totalsContainer}>
      {subTotal && <TotalsItem headText="Subtotal" amountText={subTotal} />}
      {taxRate && postTaxAmount && (
        <TotalsItem
          headText={`Sales tax @ ${taxRate}`}
          amountText={postTaxAmount}
        />
      )}
      {discountRate && postDiscountAmount && (
        <TotalsItem
          headText={`Sales tax @ ${discountRate}`}
          amountText={postDiscountAmount}
        />
      )}
      <TotalsItem headText="Total" amountText={total} />
    </View>
  );
}

export default Totals;
