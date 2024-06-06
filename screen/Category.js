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
      try {
        const response = await axiosInstance.get("/api/category");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error); // Added error handling
      }
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
        <Image
          source={{
            uri: item.image.replace(
              "http://localhost:8800/",
              "http://192.168.1.79:8800/" // Updated to reflect actual server IP address
            ),
          }}
          style={styles.image} // Ensuring the image style is applied
          resizeMode="cover"
        />
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
        keyExtractor={(item) => item.id.toString()} // Ensuring keyExtractor returns a string
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
  image: {
    width: 40,
    height: 40,
  },
  name: {
    marginTop: 5,
    fontSize: 15,
  },
});

export default Category;
