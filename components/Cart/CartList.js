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
    }, [axiosInstanceWithAuth])
  );

  useEffect(() => {
    calculateTotalPrice();
  }, [cart]);

  const calculateTotalPrice = useCallback(() => {
    const total = cart.reduce((sum, item) => {
      const price = parseFloat(item.Product.price);
      return sum + price * item.quantity;
    }, 0);
    setTotalPrice(total.toFixed(2));
  }, [cart]);

  const updateQuantity = useCallback(
    async (productId, action) => {
      try {
        const res = await axiosInstanceWithAuth.patch(
          `/api/cart/update/${productId}`,
          {
            action,
          }
        );
        setCart((prevCart) =>
          prevCart.map((item) =>
            item.Product.id === productId ? res.data : item
          )
        );
      } catch (error) {
        console.error(`Failed to ${action} quantity:`, error);
      }
    },
    [axiosInstanceWithAuth]
  );

  const deleteCartItem = useCallback(
    async (productId) => {
      try {
        await axiosInstanceWithAuth.delete(`/api/cart/delete/${productId}`);
        setCart((prevCart) =>
          prevCart.filter((item) => item.Product.id !== productId)
        );
      } catch (error) {
        console.error("Failed to delete cart item:", error);
      }
    },
    [axiosInstanceWithAuth]
  );

  const onCheckout = () => {
    navigation.navigate("PaymentMethods", { productCart: cart });
  };

  return (
    <View style={styles.container}>
      {cart.length === 0 ? (
        <Text style={styles.emptyCartText}>Your cart is empty</Text>
      ) : (
        <>
          <FlatList
            data={cart}
            keyExtractor={(item) => item.Product.id.toString()}
            renderItem={({ item }) => (
              <CartTile
                item={item}
                updateQuantity={updateQuantity}
                deleteItem={deleteCartItem}
              />
            )}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
          />
          <View style={styles.summaryContainer}>
            <Text style={styles.summaryText}>Total Cost: ${totalPrice}</Text>
            <TouchableOpacity
              style={styles.checkoutButton}
              onPress={onCheckout}
            >
              <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightWhite,
  },
  emptyCartText: {
    fontSize: 24,
    textAlign: "center",
    marginTop: "60%",
    color: COLORS.tertiary,
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
