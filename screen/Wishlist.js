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
    }, [])
  );
  const deleteFavorite = (id) => {
    setFavoritesData((prevData) => prevData.filter((item) => item.id !== id));
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

      <FlatList
        data={favoritesData}
        renderItem={({ item }) => (
          <View style={styles.favcontainer}>
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: item.Product.image }}
                resizeMode="cover"
                style={styles.productImg}
              />
            </View>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("ProductDetail", {
                  productId: item.Product.id,
                })
              }
            >
              <View style={styles.textContainer}>
                <Text style={styles.productTxt} numberOfLines={1}>
                  {item.Product.title}
                </Text>
                <Text style={styles.supplierTxt} numberOfLines={1}>
                  {item.Product.Desc}
                </Text>
                <Text style={styles.supplierTxt} numberOfLines={1}>
                  $ {item.Product.price}
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => deleteFavorite(item.id)}>
              <SimpleLineIcons name="trash" size={24} color="black" />
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
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
    marginBottom: 15,
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#FFF",
    ...SHADOWS.medium,
    shadowColor: COLORS.black,
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
});
