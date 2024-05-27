import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import React from "react";
import { SIZES, COLORS } from "../../constants";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useAuthContext } from "../../Contexts/AuthContext";

const ProductCardView = ({ product }) => {
  const navigation = useNavigation();
  const { axiosInstanceWithAuth } = useAuthContext();

  const handleAddFavorite = async () => {
    try {
      const createAddFavorite = await axiosInstanceWithAuth.post(
        "/api/wishlist",
        { productId: product.id }
      );
      console.log(createAddFavorite.data);
    } catch (error) {
      console.error("Error adding to wishlist", error);
    }
  };

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("ProductDetail", { productId: product.id })
      }
    >
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: product.image }} style={styles.image} />
        </View>
        <View style={styles.details}>
          <Text style={styles.title}>{product.title}</Text>
          <Text style={styles.price}>${product.price}</Text>
        </View>
        <TouchableOpacity style={styles.addBtn} onPress={handleAddFavorite}>
          <MaterialIcons
            name="favorite-border"
            size={24}
            color={COLORS.black}
          />
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
    backgroundColor: COLORS.lightWhite,
    marginTop: 10,
    overflow: "hidden",
  },
  imageContainer: {
    flex: 1,
    width: "100%",
    borderRadius: SIZES.small,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
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
    color: COLORS.primary,
  },
  addBtn: {
    position: "absolute",
    bottom: SIZES.small,
    right: SIZES.small,
  },
});
