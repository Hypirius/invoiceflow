import { View, Text, StyleSheet } from "@react-pdf/renderer";

export type BusinessDetailsType = {
  name: string;
  street: string;
  state: string;
  zipCode: string;
};

function BusinessDetails({
  name,
  street,
  state,
  zipCode,
}: BusinessDetailsType) {
  const styles = StyleSheet.create({
    businessDetailsContainer: {
      display: "flex",
      flexDirection: "column",
      gap: 5,
      marginBottom: 15,
    },
    name: {
      fontWeight: 700,
    },
  });
  return (
    <View style={styles.businessDetailsContainer}>
      <Text style={styles.name}>{name}</Text>
      <Text>{street}</Text>
      <Text>
        {state} {zipCode}
      </Text>
    </View>
  );
}

export default BusinessDetails;
