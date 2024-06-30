import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { SIZES, COLORS, SHADOWS } from "../../constants";
import { AntDesign, Ionicons } from "@expo/vector-icons";

const CartTile = ({ item, updateQuantity, deleteItem }) => {
  const [quantity, setQuantity] = useState(item.quantity);

  const handleQuantityChange = (action) => {
    if (action === "increase") {
      const newQuantity = quantity + 1;
      setQuantity(newQuantity);
      updateQuantity(item.Product.id, "increase");
    } else if (action === "decrease" && quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      updateQuantity(item.Product.id, "decrease");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: item.Product.image.replace(
              "http://localhost:8800/",
              "http://192.168.1.79:8800/"
            ),
          }}
          resizeMode="cover"
          style={styles.productImg}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.productTxt} numberOfLines={1}>
          {item.Product.title}
        </Text>
        <Text style={styles.supplierTxt} numberOfLines={1}>
          {item.Product.supplier}
        </Text>
        <Text style={styles.supplierTxt} numberOfLines={1}>
          {item.Product.price} * {quantity}
        </Text>
      </View>
      <View style={styles.quantityContainer}>
        <TouchableOpacity onPress={() => handleQuantityChange("decrease")}>
          <AntDesign name="minus" size={24} color={COLORS.tertiary} />
        </TouchableOpacity>
        <Text style={styles.quantity}>{quantity}</Text>
        <TouchableOpacity onPress={() => handleQuantityChange("increase")}>
          <AntDesign name="plus" size={20} color={COLORS.tertiary} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => deleteItem(item.Product.id)}>
        <Ionicons name="trash-bin" size={20} color={COLORS.tertiary} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: SIZES.medium,
    borderRadius: SIZES.small,
    backgroundColor: "#FFF",
    ...SHADOWS.small,
    alignItems: "center",
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
    color: COLORS.tertiary,
  },
  supplierTxt: {
    fontSize: SIZES.small + 2,
    fontFamily: "regular",
    color: COLORS.tertiary,
    marginTop: 3,
    textTransform: "capitalize",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: SIZES.medium,
  },
  quantity: {
    marginHorizontal: 8,
    fontSize: 18,
  },
});

export default CartTile;
