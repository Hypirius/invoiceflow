import { View, Text, Image, StyleSheet } from "@react-pdf/renderer";

function Header({ image = "" }: { image: string }) {
  const style = StyleSheet.create({
    header: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
    },
    headerText: {
      fontSize: 55,
      color: "#2F3A60",
      fontWeight: 700,
    },
    image: {
      width: 100,
      height: 100,
    },
  });
  return (
    <View style={style.header}>
      <Text style={style.headerText} id="header-text">
        Invoice
      </Text>
      <Image src={image} style={style.image}></Image>
    </View>
  );
}

export default Header;
