import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import React, { useState, useEffect } from "react";
import { SIZES, COLORS } from "../../constants";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useAuthContext } from "../../Contexts/AuthContext";

const ProductCardView = ({ product }) => {
  const navigation = useNavigation();
  const { axiosInstanceWithAuth } = useAuthContext();
  const [isFavorite, setIsFavorite] = useState(false);

  // Check if the product is already in the wishlist
  useEffect(() => {
    const checkIfFavorite = async () => {
      try {
        const res = await axiosInstanceWithAuth.get("/api/wishlist/allwish");
        const isFavorite = res.data.some(
          (item) => item.Product.id === product.id
        );
        setIsFavorite(isFavorite);
      } catch (error) {
        console.error("Error checking wishlist status", error);
      }
    };
    checkIfFavorite();
  }, [axiosInstanceWithAuth, product.id]);

  // ! add to wishlist or remove it from wishlist
  const handleToggleFavorite = async () => {
    try {
      if (isFavorite) {
        await axiosInstanceWithAuth.delete(`/api/wishlist/${product.id}`);
      } else {
        await axiosInstanceWithAuth.post("/api/wishlist", {
          productId: product.id,
        });
      }
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error("Error toggling wishlist status", error);
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
          <Image
            source={{
              uri: product.image.replace(
                "http://localhost:8800/",
                "http://192.168.1.79:8800/"
              ),
            }}
            style={styles.image}
          />
        </View>
        <View style={styles.details}>
          <Text style={styles.title}>{product.title}</Text>
          <Text style={styles.price}>${product.price}</Text>
        </View>
        <TouchableOpacity style={styles.addBtn} onPress={handleToggleFavorite}>
          <MaterialIcons
            name={isFavorite ? "favorite" : "favorite-border"}
            size={24}
            color={isFavorite ? COLORS.primary : COLORS.black}
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
