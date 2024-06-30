import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";

const SearchResultsScreen = ({ route }) => {
  const { searchQuery } = route.params;
  const [searchResults, setSearchResults] = useState([]);

  const products = [
    { id: 1, title: "Canon Camera", category: "Electronics", price: "$180.00" },
    { id: 2, title: "Arm Chair", category: "Chair", price: "$120.00" },
    { id: 3, title: "Nike Pegasus 39", category: "Shoes", price: "$90.00" },
    { id: 4, title: "Light Brown Coat", category: "Clothes", price: "$120.00" },
  ];

  useEffect(() => {
    const results = products.filter((product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(results);
  }, [searchQuery]);

  return (
    <View style={styles.container}>
      {searchResults.length === 0 ? (
        <Text style={styles.noResultsText}>
          No results found for "{searchQuery}"
        </Text>
      ) : (
        <FlatList
          data={searchResults}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.searchResultItem}>
              <Text>{item.title}</Text>
              <Text>{item.category}</Text>
              <Text>{item.price}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default SearchResultsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  searchResultItem: {
    backgroundColor: "white",
    padding: 8,
    borderRadius: 8,
    marginVertical: 4,
  },
  noResultsText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "gray",
  },
});
