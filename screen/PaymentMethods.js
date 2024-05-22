import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SIZES, COLORS } from "../constants";

const paymentMethods = [
  {
    id: "payOnDelivery",
    name: "Pay On Delivery",
    icon: "cash-outline",
  },
  { id: "stripePayment", name: "Cash", icon: "card-outline" },
];

const PaymentMethods = ({ navigation }) => {
  const [selectedMethod, setSelectedMethod] = useState(null);

  const handleSelectMethod = (method) => {
    setSelectedMethod(method.id);
  };

  const handleConfirmPayment = () => {
    if (selectedMethod === "payOnDelivery") {
      navigation.navigate("Order");
    } else if (selectedMethod === "stripePayment") {
      navigation.navigate("StripePayment");
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
      >
        <Text style={styles.confirmButtonText}>Confirm Payment</Text>
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
