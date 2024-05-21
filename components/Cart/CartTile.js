import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { SIZES, COLORS, SHADOWS } from "../../constants";
import { AntDesign, Ionicons } from "@expo/vector-icons";

const CartTile = ({ item, updateQuantity, deleteItem }) => {
  const [quantity, setQuantity] = useState(item.quantity);

  const increaseQuantity = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    updateQuantity(item._id, newQuantity);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      updateQuantity(item._id, newQuantity);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: item.cartItem.imageUrl }}
          resizeMode="cover"
          style={styles.productImg}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.productTxt} numberOfLines={1}>
          {item.cartItem.title}
        </Text>
        <Text style={styles.supplierTxt} numberOfLines={1}>
          {item.cartItem.supplier}
        </Text>
        <Text style={styles.supplierTxt} numberOfLines={1}>
          {item.cartItem.price} * {quantity}
        </Text>
      </View>
      <View style={styles.quantityContainer}>
        <TouchableOpacity onPress={decreaseQuantity}>
          <AntDesign name="minus" size={24} color={COLORS.tertiary} />
        </TouchableOpacity>
        <Text style={styles.quantity}>{quantity}</Text>
        <TouchableOpacity onPress={increaseQuantity}>
          <AntDesign name="plus" size={20} color={COLORS.tertiary} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => deleteItem(item._id)}>
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