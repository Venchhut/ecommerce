import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";

const categories = [
  { id: "1", name: "Clothes", icon: "👗" },
  { id: "2", name: "Electronics", icon: "📱" },
  { id: "3", name: "Shoes", icon: "👟" },
  { id: "4", name: "Watch", icon: "⌚️" },
];

const Category = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Simulating a fetch call to API
    setTimeout(() => {
      setData(categories);
    }, 1000);
  }, []);

  const renderCategory = ({ item }) => (
    <TouchableOpacity style={styles.categoryItem}>
      <Text style={styles.icon}>{item.icon}</Text>
      <Text style={styles.name}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Category</Text>
      <FlatList
        data={data}
        renderItem={renderCategory}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  categoryItem: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: 20,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#f1f1f1",
  },
  icon: {
    fontSize: 30,
  },
  name: {
    marginTop: 5,
    fontSize: 16,
  },
});

export default Category;
