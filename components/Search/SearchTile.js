import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";
import { SIZES, COLORS, SHADOWS } from "../../constants";
import { useNavigation } from "@react-navigation/native";

const SearchTile = ({ item }) => {
  const navigation = useNavigation();

  return (
    <View>
      <TouchableOpacity
        onPress={() => navigation.navigate("Details", { item })}
        style={styles.container}
      >
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: item.imageUrl }}
            resizeMode="cover"
            style={styles.productImg}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.productTxt} numberOfLines={1}>
            {item.title}
          </Text>
          <Text style={styles.supplierTxt} numberOfLines={1}>
            {item.supplier}
          </Text>
          <Text style={styles.supplierTxt} numberOfLines={1}>
            {item.price}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    flexDirection: "row",
    padding: SIZES.medium,
    borderRadius: SIZES.small,
    backgroundColor: "#FFF",
    ...SHADOWS.medium,
    shadowColor: COLORS.white,
  },
  imageContainer: {
    width: 70,
    backgroundColor: COLORS.secondary,
    borderRadius: SIZES.medium,
    justifyContent: "center",
    alignItems: "center",
  },
  productImg: {
    width: "100%",
    height: 65,
    borderRadius: SIZES.small,
  },
  textContainer: {
    flex: 1,
    marginHorizontal: SIZES.medium,
  },
  productTxt: {
    fontSize: SIZES.medium,
    fontFamily: "bold",
    color: COLORS.primary,
  },
  supplierTxt: {
    fontSize: SIZES.small + 2,
    fontFamily: "regular",
    color: COLORS.gray,
    marginTop: 3,
    textTransform: "capitalize",
  },
});

export default SearchTile;
