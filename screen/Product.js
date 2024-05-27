import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
} from "react-native";
import { useAuthContext } from "../Contexts/AuthContext";
import { SIZES, COLORS } from "../constants/index";
import ProductCardView from "../components/Product/ProductCardView";
import { Ionicons } from "@expo/vector-icons";

const Product = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const { axiosInstance } = useAuthContext();

  useEffect(() => {
    const getProducts = async () => {
      const res = await axiosInstance.get("/api/product");
      setProducts(res.data.products);
    };
    getProducts();
  }, []);

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
      <FlatList
        data={products}
        renderItem={({ item }) => (
          <View style={styles.productContainer}>
            <ProductCardView product={item} />
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={{ padding: SIZES.medium }}
      />
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
    fontSize: SIZES.large,
  },
  productContainer: {
    flex: 1,
    margin: SIZES.small,
  },
  row: {
    justifyContent: "space-between",
  },
});
