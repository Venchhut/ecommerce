import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  SafeAreaView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS, SIZES, SHADOWS } from "../constants";
import { SimpleLineIcons, Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useAuthContext } from "../Contexts/AuthContext";

const Wishlist = () => {
  const navigation = useNavigation();
  const { axiosInstanceWithAuth } = useAuthContext();
  const [favoritesData, setFavoritesData] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      const fetchWish = async () => {
        try {
          const res = await axiosInstanceWithAuth.get("/api/wishlist/allwish");
          setFavoritesData(res.data);
        } catch (error) {
          console.error("Failed to fetch wishlist data:", error);
        }
      };
      fetchWish();
    }, [axiosInstanceWithAuth])
  );

  const deleteFavorite = async (productId) => {
    try {
      console.log(`Attempting to delete product with ID: ${productId}`);
      await axiosInstanceWithAuth.delete(`/api/wishlist/${productId}`);
      setFavoritesData((prevData) =>
        prevData.filter((item) => item.Product.id !== productId)
      );
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const truncateText = (text, wordLimit) => {
    const words = text.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return text;
  };

  const renderItem = ({ item }) => {
    if (!item.Product) {
      return null;
    }

    const { image, title, Desc, price, id } = item.Product;
    const truncatedDesc = truncateText(Desc, 5);

    return (
      <View style={styles.favcontainer}>
        <View style={styles.productInfo}>
          <View style={styles.imageContainer}>
            <Image
              source={{
                uri: image.replace(
                  "http://localhost:8800/",
                  "http://192.168.1.79:8800/"
                ),
              }}
              resizeMode="cover"
              style={styles.productImg}
            />
          </View>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("ProductDetail", { productId: id })
            }
          >
            <View style={styles.textContainer}>
              <Text style={styles.productTxt} numberOfLines={1}>
                {title}
              </Text>
              <Text style={styles.supplierTxt} numberOfLines={1}>
                {truncatedDesc}
              </Text>
              <Text style={styles.supplierTxt} numberOfLines={1}>
                $ {price}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => deleteFavorite(id)}>
          <SimpleLineIcons name="trash" size={24} color="black" />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.upperRow}>
        <TouchableOpacity
          style={{ paddingLeft: 0 }}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back-circle" size={30} color={COLORS.black} />
        </TouchableOpacity>
        <Text style={styles.title}>Favorites</Text>
      </View>
      {favoritesData.length === 0 ? (
        <Text style={styles.emptyMessage}>Your wishlist is empty.</Text>
      ) : (
        <FlatList
          data={favoritesData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
    </SafeAreaView>
  );
};

export default Wishlist;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  upperRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "500",
    letterSpacing: 2,
    marginLeft: 10,
  },
  favcontainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#FFF",
    ...SHADOWS.medium,
    shadowColor: COLORS.black,
  },
  productInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  imageContainer: {
    width: 70,
    height: 70,
    backgroundColor: COLORS.secondary,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  productImg: {
    width: "100%",
    height: "100%",
  },
  textContainer: {
    flex: 1,
    marginHorizontal: 15,
  },
  productTxt: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.primary,
  },
  supplierTxt: {
    fontSize: 14,
    color: COLORS.tertiary,
    marginTop: 3,
  },
  emptyMessage: {
    fontSize: 24,
    color: COLORS.tertiary,
    textAlign: "center",
    marginTop: "60%",

    alignItems: "center", // Align text horizontally
    justifyContent: "center", // Align text vertically
  },
});
