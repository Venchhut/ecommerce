import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, SIZES, FONTS } from "../constants"; // Make sure to have FONTS in your constants

import ProductList from "../components/Product/ProductList";

const Product = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back-circle" size={30} color={COLORS.black} />
        </TouchableOpacity>
        <Text style={styles.title}>All Products</Text>
      </View>
      <ProductList />
    </SafeAreaView>
  );
};

export default Product;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  backButton: {
    position: "absolute",
    left: 20,
  },
  title: {
    fontFamily: "bold",
    fontSize: SIZES.large,
  },
});
