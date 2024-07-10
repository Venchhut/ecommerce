import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { SIZES, COLORS } from "../../constants";
const OrderTile = ({ item }) => {
  const product = item.Product || {};
  const imageUrl = product.image
    ? product.image.replace(
        "http://localhost:8800/",
        "http://192.168.1.79:8800/"
      )
    : null;

  return (
    <View style={styles.favcontainer}>
      <View style={styles.productInfo}>
        <View style={styles.imageContainer}>
          {imageUrl ? (
            <Image source={{ uri: imageUrl }} style={styles.productImg} />
          ) : (
            <View style={styles.placeholderImage} />
          )}
        </View>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("ProductDetail", { productId: product.id })
          }
        >
          <View style={styles.textContainer}>
            <Text style={styles.productTxt} numberOfLines={1}>
              {product.title || "No Title"}
            </Text>
            <Text style={styles.supplierTxt} numberOfLines={1}>
              Qty: {item.quantity ? `${item.quantity} pcs` : "No Quantity"}
            </Text>
            <Text style={styles.price}>
              ${product.price ? parseFloat(product.price).toFixed(2) : "0.00"}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.trackBtn}>
        <Text style={styles.trackBtnText}>Track Order</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  favcontainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#FFF",
    shadowColor: COLORS.black,
  },
  productInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  imageContainer: {
    width: 70,
    height: 70,
    backgroundColor: COLORS.secondary,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  productImg: {
    width: "100%",
    height: "100%",
  },
  placeholderImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    backgroundColor: COLORS.gray,
  },
  textContainer: {
    flex: 1,
    marginHorizontal: 15,
  },
  productTxt: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.tertiary,
  },
  supplierTxt: {
    fontSize: 14,
    color: COLORS.tertiary,
    marginTop: 3,
  },
  price: {
    fontSize: 14,
    color: COLORS.tertiary,
    marginTop: 3,
  },
  trackBtn: {
    backgroundColor: COLORS.primary,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  trackBtnText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default OrderTile;
