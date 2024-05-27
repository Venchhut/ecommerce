import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import CartTile from "./CartTile";
import { COLORS, SIZES } from "../../constants";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useAuthContext } from "../../Contexts/AuthContext";

const CartList = () => {
  const navigation = useNavigation();
  const { axiosInstanceWithAuth } = useAuthContext();
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useFocusEffect(
    useCallback(() => {
      const fetchAllCart = async () => {
        try {
          const res = await axiosInstanceWithAuth.get("/api/cart/find");
          setCart(res.data);
        } catch (error) {
          console.error("Failed to fetch cart data:", error);
        }
      };
      fetchAllCart();
    }, [])
  );

  useEffect(() => {
    calculateTotalPrice();
  }, [cart]);

  const calculateTotalPrice = () => {
    const total = cart.reduce((sum, item) => {
      const price = parseFloat(item.Product.price);
      return sum + price * item.quantity;
    }, 0);
    setTotalPrice(total.toFixed(2));
  };

  const updateQuantity = (id, newQuantity) => {
    const newData = cart.map((item) => {
      if (item.id === id) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    setCart(newData);
  };

  const onCheckout = () => {
    console.log("Checkout button pressed");
    // Add your checkout functionality here
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={cart}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <CartTile item={item} updateQuantity={updateQuantity} />
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
      <View style={styles.summaryContainer}>
        <Text style={styles.summaryText}>Total Cost: ${totalPrice}</Text>
        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={() =>
            navigation.navigate("PaymentMethods", { productCart: cart })
          }
        >
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
    marginBottom: "10%",
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
    paddingVertical: 15,
    borderRadius: SIZES.medium,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginHorizontal: 20,
    width: "90%",
  },
  checkoutButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default CartList;
