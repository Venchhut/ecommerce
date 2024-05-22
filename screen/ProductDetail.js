import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { COLORS, SIZES } from "../constants";
import { useNavigation } from "@react-navigation/native";

import {
  Ionicons,
  MaterialIcons,
  AntDesign,
  Feather,
} from "@expo/vector-icons";

const ProductDetail = () => {
  const [count, setCount] = useState(1);
  const increase = () => {
    setCount(count + 1);
  };
  const decrease = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.upperRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back-circle" size={30} color={COLORS.black} />
        </TouchableOpacity>
        <Text style={styles.title}>Product Details</Text>
        <TouchableOpacity>
          <MaterialIcons name="favorite-border" size={30} />
        </TouchableOpacity>
      </View>
      <Image
        source={{
          uri: "https://cdn2.cellphones.com.vn/x/media/catalog/product/m/a/macbook-air-m1-2020-gold-600x600.jpg",
        }}
        style={styles.image}
      />
      <View style={styles.details}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>Product</Text>
          <View style={styles.priceWrapper}>
            <Text style={styles.price}>$100</Text>
          </View>
        </View>
        <View style={styles.ratingRow}>
          <View style={styles.rating}>
            {[1, 2, 3, 4, 5].map((index) => (
              <Ionicons key={index} name="star" size={24} color="gold" />
            ))}
            <Text style={styles.ratingText}>(4.8)</Text>
          </View>
          <View style={styles.rating}>
            <TouchableOpacity
              onPress={() => {
                increase();
              }}
            >
              <AntDesign name="pluscircleo" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.ratingText}>{count}</Text>
            <TouchableOpacity
              onPress={() => {
                decrease();
              }}
            >
              <AntDesign name="minuscircleo" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.descriptionwrapper}>
          <Text style={styles.decription}>sjdklfj</Text>
          <Text style={styles.descText}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Text>
        </View>
        <View style={styles.cartRow}>
          <View style={{ color: "white" }}>
            <Text style={styles.totalPriceText}>Total Price</Text>
            <Text style={styles.priceText}>$120.00</Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate("Cart")}
            style={styles.cartBtn}
          >
            <Feather
              name="shopping-cart"
              size={24}
              color="black"
              style={styles.cartText}
            />
            <Text style={styles.cartText}>Add to Cart </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightWhite,
  },
  wrapper: {
    flex: 1,
    backgroundColor: COLORS.lightWhite,
  },
  upperRow: {
    marginHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    width: SIZES.width - 44,
    top: SIZES.xxLarge,
    zIndex: 999,
  },
  titleRow: {
    marginHorizontal: 20,
    paddingBottom: SIZES.small,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: SIZES.width - 44,
    top: 20,
  },
  image: {
    aspectRatio: 1,
    overflow: "hidden",
  },
  title: {
    fontFamily: "bold",
    fontSize: SIZES.large,
  },
  price: {
    paddingHorizontal: 10,
    fontFamily: "semibold",
    fontSize: SIZES.large,
  },
  ratingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: SIZES.medium,
  },
  rating: {
    top: SIZES.large,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginHorizontal: SIZES.large,
  },
  ratingText: {
    color: COLORS.tertiary,
    fontFamily: "medium",
    marginLeft: SIZES.small,
    flexDirection: "row",
    alignItems: "center",
  },
  details: {
    marginTop: -SIZES.large,
    backgroundColor: COLORS.lightWhite,
    width: SIZES.width,
    borderTopLeftRadius: SIZES.medium,
    borderTopRightRadius: SIZES.medium,
  },
  priceWrapper: {
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.large,
  },
  descriptionwrapper: {
    marginTop: SIZES.large * 2,
    marginHorizontal: SIZES.large,
  },
  decription: {
    fontFamily: "medium",
    fontSize: SIZES.large,
    marginBottom: 10,
  },
  descText: {
    fontSize: SIZES.medium,
    textAlign: "justify",
    marginBottom: SIZES.small,
  },
  cartRow: {
    flexDirection: "row",
    justifyContent: "space-between", // Center the button within the row
    alignItems: "center",
    width: "100%", // Ensure the row takes full width
    paddingHorizontal: 20, // Padding for alignment
    paddingBottom: 20, // Padding to avoid overlap with screen edges
    marginTop: "20%",
  },
  cartBtn: {
    flexDirection: "row", // Align icon and text in a row
    // alignItems: "center",
    // justifyContent: "center",
    // backgroundColor: COLORS.primary,
    // paddingVertical: 16,
    // paddingHorizontal: 32,
    // borderRadius: 30,
    // alignItems: "center",
    // width: "70%",

    backgroundColor: COLORS.primary,
    paddingVertical: 15,
    borderRadius: SIZES.medium,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginHorizontal: 20,
    width: "70%",
  },
  cartText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "bold",
  },
  totalPriceText: {
    fontSize: 16,
    color: "black",
  },
  priceText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
});
