import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS, SIZES } from "../constants";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons, MaterialIcons, Feather } from "@expo/vector-icons";
import { useAuthContext } from "../Contexts/AuthContext";

const ProductDetail = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { productId } = route.params;
  const { axiosInstance, axiosInstanceWithAuth } = useAuthContext();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const response = await axiosInstance.get(`/api/product/${productId}`);
        setProduct(response.data);

        // Check if the product is in the wishlist
        const wishlistResponse = await axiosInstanceWithAuth.get(
          "/api/wishlist/allwish"
        );
        const isFavorite = wishlistResponse.data.some(
          (item) => item.Product.id === productId
        );
        setIsFavorite(isFavorite);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProductDetail();
  }, [productId, axiosInstance, axiosInstanceWithAuth]);

  const handleAddCart = async () => {
    try {
      const response = await axiosInstanceWithAuth.post(
        `/api/cart/add/${productId}`,
        {
          productId: product.id,
          quantity: 1,
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error adding to cart", error);
    }
  };

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

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  if (!product) {
    return null;
  }

  const truncatedDescription = product.Desc.slice(0, 100) + "...";

  return (
    <View style={styles.container}>
      <View style={styles.upperRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back-circle" size={30} color={COLORS.black} />
        </TouchableOpacity>
        <Text style={styles.title}>Product Details</Text>
        <TouchableOpacity onPress={handleToggleFavorite}>
          <MaterialIcons
            name={isFavorite ? "favorite" : "favorite-border"}
            size={30}
            color={isFavorite ? COLORS.primary : COLORS.black}
          />
        </TouchableOpacity>
      </View>
      <ScrollView>
        <Image
          source={{
            uri: product.image.replace(
              "http://localhost:8800/",
              "http://192.168.1.79:8800/"
            ),
          }}
          style={styles.image}
        />
        <View style={styles.details}>
          <View style={styles.titleRow}>
            <Text style={styles.title}>{product.title}</Text>
            <View style={styles.priceWrapper}>
              <Text style={styles.price}>${product.price}</Text>
            </View>
          </View>
          <View style={styles.ratingRow}>
            <View style={styles.rating}>
              {[1, 2, 3, 4, 5].map((index) => (
                <Ionicons key={index} name="star" size={24} color="gold" />
              ))}
              <Text style={styles.ratingText}>(4.8)</Text>
            </View>
          </View>
          <View style={styles.descriptionWrapper}>
            <Text style={styles.description}>Description</Text>
            <Text style={styles.descText}>
              {showFullDescription ? product.Desc : truncatedDescription}
            </Text>
            <TouchableOpacity onPress={toggleDescription}>
              <Text style={styles.toggleText}>
                {showFullDescription ? "See Less" : "See More"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <View style={styles.cartRow}>
        <View>
          <Text style={styles.totalPriceText}>Total Price</Text>
          <Text style={styles.priceText}>${product.price}</Text>
        </View>
        <TouchableOpacity onPress={handleAddCart} style={styles.cartBtn}>
          <Feather
            name="shopping-cart"
            size={24}
            color="black"
            style={styles.cartText}
          />
          <Text style={styles.cartText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightWhite,
  },
  upperRow: {
    marginHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    width: SIZES.width - 44,
    top: SIZES.xxLarge,
    zIndex: 999,
  },
  titleRow: {
    marginHorizontal: 20,
    paddingBottom: SIZES.small,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: SIZES.width - 44,
    top: 20,
  },
  image: {
    aspectRatio: 1,
    overflow: "hidden",
  },
  title: {
    fontFamily: "bold",
    fontSize: SIZES.large,
  },
  price: {
    paddingHorizontal: 10,
    fontSize: SIZES.large,
  },
  ratingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: SIZES.medium,
  },
  rating: {
    top: SIZES.large,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginHorizontal: SIZES.large,
  },
  ratingText: {
    color: COLORS.tertiary,
    fontFamily: "medium",
    marginLeft: SIZES.small,
    flexDirection: "row",
    alignItems: "center",
  },
  details: {
    marginTop: -SIZES.large,
    backgroundColor: COLORS.lightWhite,
    width: SIZES.width,
    borderTopLeftRadius: SIZES.medium,
    borderTopRightRadius: SIZES.medium,
  },
  priceWrapper: {
    backgroundColor: COLORS.lightWhite,
    borderRadius: SIZES.large,
  },
  descriptionWrapper: {
    marginTop: SIZES.large * 2,
    marginHorizontal: SIZES.large,
  },
  description: {
    fontFamily: "medium",
    fontSize: SIZES.large,
    marginBottom: 10,
  },
  descText: {
    fontSize: SIZES.medium,
    textAlign: "justify",
    marginBottom: SIZES.small,
  },
  toggleText: {
    color: COLORS.tertiary,
    fontSize: SIZES.medium,
    fontWeight: "bold",
    textAlign: "right",
  },
  cartRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 20,
    paddingBottom: 20,
    // marginTop: "20%",
  },
  cartBtn: {
    flexDirection: "row",
    backgroundColor: COLORS.primary,
    paddingVertical: 15,
    borderRadius: SIZES.medium,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginHorizontal: 20,
    width: "70%",
  },
  cartText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "bold",
  },
  totalPriceText: {
    fontSize: 16,
    color: "black",
  },

  priceText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.lightWhite,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.lightWhite,
  },
  errorText: {
    color: COLORS.error,
    fontSize: SIZES.large,
  },
});
