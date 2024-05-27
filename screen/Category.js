import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { COLORS } from "../constants";
import { useAuthContext } from "../Contexts/AuthContext";
import { useNavigation } from "@react-navigation/native";

const Category = () => {
  const [data, setData] = useState([]);
  const { axiosInstance } = useAuthContext();
  const navigation = useNavigation();
  useEffect(() => {
    const fetchCategory = async () => {
      const response = await axiosInstance.get("/api/category");
      setData(response.data);
    };
    fetchCategory();
  }, []);

  const renderCategory = ({ item }) => (
    <View style={styles.header}>
      <TouchableOpacity
        style={styles.categoryItem}
        onPress={() =>
          navigation.navigate("productCategory", { catetoryId: item.id })
        }
      >
        <Text style={styles.icon}>{item.icon}</Text>
      </TouchableOpacity>
      <Text style={styles.name}>{item.name}</Text>
    </View>
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
  header: {
    marginRight: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  categoryItem: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderRadius: 50,
    backgroundColor: COLORS.lightWhite,
  },
  icon: {
    fontSize: 30,
  },
  name: {
    marginTop: 5,
    fontSize: 16,
    marginBottom: 10, // Add vertical space below each category name
  },
});

export default Category;
