import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SIZES, COLORS } from "../constants";
import {
  initPaymentSheet,
  presentPaymentSheet,
} from "@stripe/stripe-react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useAuthContext } from "../Contexts/AuthContext";

const paymentMethods = [
  {
    id: "payOnDelivery",
    name: "Pay On Delivery",
    icon: "cash-outline",
  },
  {
    id: "stripePayment",
    name: "Card",
    icon: "card-outline",
  },
];

const PaymentMethods = () => {
  const navigation = useNavigation();
  const { axiosInstanceWithAuth } = useAuthContext();
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [loading, setLoading] = useState(false);
  const route = useRoute();
  const { productCart } = route.params;
  const handleSelectMethod = (method) => {
    setSelectedMethod(method.id);
  };
  const handleConfirmPayment = async () => {
    if (selectedMethod === "payOnDelivery") {
      navigation.navigate("Order");
    } else if (selectedMethod === "stripePayment") {
      setLoading(true);
      try {
        // Initialize an array to store payment intents
        const paymentIntents = [];
        const totalAmount = productCart.reduce((acc, cartItem) => {
          const itemAmount =
            parseFloat(cartItem.Product.price) * cartItem.quantity * 100;
          return acc + itemAmount;
        }, 0);
        // Create a payment intent for each product
        const response = await axiosInstanceWithAuth.post(
          "/api/order/payment",
          {
            productCart: productCart,
            amount: totalAmount,
          }
        );
        const { clientSecret } = response.data;

        // Push the payment intent to the array
        paymentIntents.push(clientSecret);
        // Initialize payment sheet for each payment intent
        for (const paymentIntent of paymentIntents) {
          const { error: initError } = await initPaymentSheet({
            paymentIntentClientSecret: paymentIntent,
            merchantDisplayName: "Shop",
            returnURL: "https://your-return-url.com",
          });

          if (initError) {
            Alert.alert("Error", initError.message);
            setLoading(false);
            return;
          }

          const { error: presentError } = await presentPaymentSheet();

          if (presentError) {
            Alert.alert("Error", presentError.message);
            console.log();
          } else {
            Alert.alert("Success", "Your payment was successful!");
            navigation.navigate("Home");
          }
        }
      } catch (error) {
        console.error("Error creating payment intent:", error);
        Alert.alert(
          "Error",
          "There was an issue with your payment. Please try again."
        );
      }
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-outline" size={24} color={COLORS.black} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Payment Methods</Text>
      </View>
      <FlatList
        data={paymentMethods}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.methodContainer,
              item.id === selectedMethod && styles.selectedMethod,
            ]}
            onPress={() => handleSelectMethod(item)}
          >
            <Ionicons name={item.icon} size={24} color={COLORS.primary} />
            <Text style={styles.methodName}>{item.name}</Text>
            {item.id === selectedMethod && (
              <Ionicons
                name="checkmark-circle"
                size={24}
                color={COLORS.primary}
              />
            )}
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity
        style={styles.confirmButton}
        onPress={handleConfirmPayment}
        disabled={loading}
      >
        <Text style={styles.confirmButtonText}>
          {loading ? "Processing..." : "Confirm Payment"}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: COLORS.lightWhite,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  headerTitle: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: "bold",
  },
  methodContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    marginVertical: 10,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.small,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
  },
  selectedMethod: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primaryLight,
  },
  methodName: {
    marginLeft: 10,
    fontSize: 16,
    flex: 1,
    color: COLORS.darkGray,
  },
  confirmButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 15,
    borderRadius: SIZES.medium,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginHorizontal: 20,
  },
  confirmButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default PaymentMethods;
