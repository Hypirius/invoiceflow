import { View, Text, StyleSheet } from "@react-pdf/renderer";
import BusinessDetails, { BusinessDetailsType } from "./BusinessDetails";

type ClientAddressProps = {
  shippingAddress: BusinessDetailsType;
  billingAddress: BusinessDetailsType;
};

function ClientAddresses({
  shippingAddress,
  billingAddress,
}: ClientAddressProps) {
  const style = StyleSheet.create({
    clientAddressContainer: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      gap: 70,
    },
    header: {
      fontSize: 16,
      fontWeight: 600,
      marginBottom: 10,
    },
  });
  return (
    <View style={style.clientAddressContainer}>
      <View>
        <Text style={style.header}>BILL TO</Text>
        <BusinessDetails {...shippingAddress} />
      </View>
      <View>
        <Text style={style.header}>SHIP TO</Text>
        <BusinessDetails {...billingAddress} />
      </View>
    </View>
  );
}

export default ClientAddresses;
