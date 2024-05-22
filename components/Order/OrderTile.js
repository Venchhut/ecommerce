import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

const OrderTile = ({ item }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: item.productId.imageUrl }} style={styles.image} />
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{item.productId.title}</Text>
        <Text style={styles.category}>
          {item.productId.category} | Qty: {item.quantity} pcs
        </Text>
        <Text style={styles.price}>${item.productId.price.toFixed(2)}</Text>
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Track Order</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "white",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 16,
  },
  detailsContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  category: {
    fontSize: 14,
    color: "#666",
    marginVertical: 4,
  },
  price: {
    fontSize: 14,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#FF3D00",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
});

export default OrderTile;
