import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SIZES } from "../../constants";
import ProductCardView from "./ProductCardView";

import { useAuthContext } from "../../Contexts/AuthContext";
const ProductRow = () => {
  const [products, setProducts] = useState([]);
  const { axiosInstance } = useAuthContext();
  useEffect(() => {
    console.log("produccct");
    const getProducts = async () => {
      const res = await axiosInstance.get("/api/product");
      setProducts(res.data.products);
    };
    getProducts();
  }, []);
  return (
    <View style={{ marginTop: SIZES.medium }}>
      <FlatList
        data={products}
        renderItem={({ item }) => <ProductCardView product={item} />}
        horizontal
        contentContainerStyle={{ columnGap: SIZES.medium }}
      />
    </View>
  );
};

export default ProductRow;

const styles = StyleSheet.create({});
