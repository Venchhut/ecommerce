import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { COLORS, SIZES } from "../constants";
import { Ionicons } from "@expo/vector-icons";
import CartList from "../components/Cart/CartList";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuthContext } from "../Contexts/AuthContext";

const Cart = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.upperRow}>
        <TouchableOpacity
          style={{ paddingLeft: 0 }}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back-circle" size={30} color={COLORS.black} />
        </TouchableOpacity>
        <Text style={styles.title}>My Cart</Text>
      </View>
      <CartList />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightWhite,
    paddingHorizontal: 20,
  },
  upperRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: SIZES.xLarge,
    fontFamily: "bold",
    fontWeight: "500",
    letterSpacing: 2,
    paddingTop: SIZES.small,
    marginLeft: SIZES.xLarge,
    marginBottom: SIZES.xSmall,
  },
});

export default Cart;
