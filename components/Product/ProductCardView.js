import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import React from "react";
import { SIZES, COLORS } from "../../constants";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const ProductCardView = ({ product }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("ProductDetail", { product })}
    >
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: product.image }} style={styles.image} />
        </View>
        <View style={styles.details}>
          <Text style={styles.title}>{product.title}</Text>
          <Text style={styles.supplier}>{product.Desc}</Text>
          <Text style={styles.price}>{product.price}</Text>
        </View>
        <TouchableOpacity style={styles.addBtn}>
          <MaterialIcons name="favorite-border" size={24} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCardView;

const styles = StyleSheet.create({
  container: {
    width: 182,
    height: 240,
    marginEnd: 20,
    borderRadius: SIZES.medium,
    backgroundColor: COLORS.secondary,
  },
  imageContainer: {
    flex: 1,
    width: 170,
    marginLeft: SIZES.small / 2,
    marginTop: SIZES.small / 2,
    borderRadius: SIZES.small,
    overflow: "hidden",
  },
  image: {
    aspectRatio: 1,
    resizeMode: "cover",
  },
  details: {
    padding: SIZES.small,
  },
  title: {
    fontFamily: "bold",
    fontSize: SIZES.large,
    marginBottom: 2,
  },
  price: {
    fontFamily: "bold",
    fontSize: SIZES.medium,
  },
  addBtn: {
    position: "absolute",
    bottom: SIZES.small,
    right: SIZES.small,
  },
});
