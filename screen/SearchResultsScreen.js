import React from "react";
import { StyleSheet, View, FlatList, SafeAreaView, Text } from "react-native";
import { SIZES, COLORS } from "../constants/index";
import ProductCardView from "../components/Product/ProductCardView";
const SearchResultsScreen = ({ route }) => {
  const { filteredProducts } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      {filteredProducts.length === 0 ? (
        <Text style={styles.noResultsText}>No results found</Text>
      ) : (
        <FlatList
          data={filteredProducts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.productCardContainer}>
              <ProductCardView product={item} />
            </View>
          )}
          numColumns={2}
          columnWrapperStyle={styles.row}
        />
      )}
    </SafeAreaView>
  );
};

export default SearchResultsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  productCardContainer: {
    flex: 1,
    margin: 8,
  },
  row: {
    justifyContent: "space-between",
  },
  noResultsText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "gray",
  },
});
