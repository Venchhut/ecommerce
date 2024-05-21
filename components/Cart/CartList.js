import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import CartTile from "./CartTile";
import { COLORS, SIZES } from "../../constants";

const CartList = () => {
  // Simulated data
  const initialData = [
    {
      _id: "1",
      cartItem: {
        title: "Light Brown Coat",
        imageUrl:
          "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-15-plus_1_.png",
        supplier: "Clothes",
        price: "$120",
      },
      quantity: 1,
    },
    {
      _id: "2",
      cartItem: {
        title: "Nike Pegasus 39",
        imageUrl:
          "https://cdn2.cellphones.com.vn/x/media/catalog/product/m/a/macbook-air-m1-2020-gold-600x600.jpg",
        supplier: "Shoes",
        price: "$90",
      },
      quantity: 1,
    },
    {
      _id: "3",
      cartItem: {
        title: "Nike Pegasus",
        imageUrl: "https://via.placeholder.com/150",
        supplier: "Shoes",
        price: "$85",
      },
      quantity: 1,
    },
  ];

  const [data, setData] = useState(initialData);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    calculateTotalPrice();
  }, [data]);

  const calculateTotalPrice = () => {
    const total = data.reduce((sum, item) => {
      const price = parseFloat(item.cartItem.price.replace("$", ""));
      return sum + price * item.quantity;
    }, 0);
    setTotalPrice(total.toFixed(2));
  };

  const updateQuantity = (id, newQuantity) => {
    const newData = data.map((item) => {
      if (item._id === id) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    setData(newData);
  };

  const onCheckout = () => {
    // Add your checkout functionality here
    console.log("Checkout button pressed");
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <CartTile item={item} updateQuantity={updateQuantity} />
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
      <View style={styles.summaryContainer}>
        <Text style={styles.summaryText}>Total Cost: ${totalPrice}</Text>
        <TouchableOpacity style={styles.checkoutButton} onPress={onCheckout}>
          <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightWhite,
  },
  separator: {
    height: 16,
  },
  summaryContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    alignItems: "center",
  },
  summaryText: {
    fontSize: 16,
    marginBottom: 4,
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 16,
  },
  checkoutButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 30,
    alignItems: "center",
    width: "90%",
  },
  checkoutButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default CartList;
