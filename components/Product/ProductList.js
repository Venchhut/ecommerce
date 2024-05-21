import React from "react";
import { View, FlatList, StyleSheet, Text } from "react-native";
import { COLORS, SIZES } from "../../constants";
import ProductCardView from "./ProductCardView";

const productData = {
  desk: [
    {
      id: "1",
      name: "Modern Desk",
      price: 199.99,
      imageUrl: "https://example.com/modern-desk.png",
    },
    {
      id: "2",
      name: "Classic Desk",
      price: 149.99,
      imageUrl: "https://example.com/classic-desk.png",
    },
    // Add more desk products here
  ],
  chair: [
    {
      id: "1",
      name: "Office Chair",
      price: 89.99,
      imageUrl: "https://example.com/office-chair.png",
    },
    {
      id: "2",
      name: "Gaming Chair",
      price: 129.99,
      imageUrl: "https://example.com/gaming-chair.png",
    },
    // Add more chair products here
  ],
  couch: [
    {
      id: "1",
      name: "Leather Couch",
      price: 499.99,
      imageUrl: "https://example.com/leather-couch.png",
    },
    {
      id: "2",
      name: "Fabric Couch",
      price: 399.99,
      imageUrl: "https://example.com/fabric-couch.png",
    },
    // Add more couch products here
  ],
};

const ProductList = ({ category }) => {
  let products = [];

  switch (category) {
    case "Working desks":
      products = productData.desk;
      break;
    case "Chairs":
      products = productData.chair;
      break;
    case "Couches":
      products = productData.couch;
      break;
    default:
      products = [
        {
          id: "1",
          title: "Product 1",
          supplier: "Supplier A",
          price: 20.99,
          imageUrl:
            "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-15-plus_1_.png",
        },
        {
          id: "2",
          title: "Product 2",
          supplier: "Supplier B",
          price: 15.49,
          imageUrl:
            "https://cdn2.cellphones.com.vn/x/media/catalog/product/m/a/macbook-air-m1-2020-gold-600x600.jpg",
        },
        {
          id: "3",
          title: "Product 3",
          supplier: "Supplier C",
          price: 30.0,
          imageUrl:
            "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/ipad-air-5.png",
        },
        {
          id: "4",
          title: "Product 4",
          supplier: "Supplier D",
          price: 25.0,
          imageUrl:
            "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/ipad-air-5.png",
        },
        {
          id: "5",
          title: "Product 5",
          supplier: "Supplier E",
          price: 40.0,
          imageUrl:
            "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/ipad-air-5.png",
        },
        {
          id: "6",
          title: "Product 5",
          supplier: "Supplier E",
          price: 40.0,
          imageUrl:
            "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/ipad-air-5.png",
        },
      ];
  }

  if (!products.length) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No products available</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={({ item }) => <ProductCardView item={item} />}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.contentContainer}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: SIZES.xxLarge,
    paddingLeft: SIZES.small / 2,
  },
  contentContainer: {
    alignItems: "center",
  },
  separator: {
    height: 16,
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyText: {
    fontSize: 18,
    color: COLORS.primary,
  },
});

export default ProductList;
