import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  SafeAreaView,
} from "react-native";
import React, { useState } from "react";
import { COLORS, SIZES, SHADOWS } from "../constants";
import { SimpleLineIcons, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
const Wishlist = () => {
  const navigation = useNavigation();
  const [favoritesData, setFavoritesData] = useState([
    {
      id: 1,
      title: "Product 1",
      supplier: "Supplier A",
      price: 20.99,
      imageUrl:
        "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-15-plus_1_.png",
    },
    {
      id: 2,
      title: "Product 2",
      supplier: "Supplier B",
      price: 15.49,
      imageUrl:
        "https://cdn2.cellphones.com.vn/x/media/catalog/product/m/a/macbook-air-m1-2020-gold-600x600.jpg",
    },
    {
      id: 3,
      title: "Product 3",
      supplier: "Supplier C",
      price: 30.0,
      imageUrl:
        "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/ipad-air-5.png",
    },
    {
      id: 4,
      title: "Product 3",
      supplier: "Supplier C",
      price: 30.0,
      imageUrl:
        "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/ipad-air-5.png",
    },
    {
      id: 5,
      title: "Product 3",
      supplier: "Supplier C",
      price: 30.0,
      imageUrl:
        "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/ipad-air-5.png",
    },
    {
      id: 6,
      title: "Product 3",
      supplier: "Supplier C",
      price: 30.0,
      imageUrl:
        "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/ipad-air-5.png",
    },
  ]);

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
        <Text style={styles.title}> Favorites </Text>
      </View>

      <FlatList
        data={favoritesData}
        renderItem={({ item }) => (
          // Render your favorite item here
          <View>
            <TouchableOpacity
              style={styles.favcontainer}
              // onPress={() => navigation.navigate('Details')}
            >
              <TouchableOpacity style={styles.imageContainer}>
                <Image
                  source={{ uri: item.imageUrl }}
                  resizeMode="cover"
                  style={styles.productImg}
                />
              </TouchableOpacity>
              <View style={styles.textContainer}>
                <Text style={styles.productTxt} numberOfLines={1}>
                  {item.title}
                </Text>
                <Text style={styles.supplierTxt} numberOfLines={1}>
                  {item.supplier}
                </Text>
                <Text style={styles.supplierTxt} numberOfLines={1}>
                  $ {item.price}
                </Text>
              </View>
              <TouchableOpacity onPress={() => deleteFavorite(item.id)}>
                <SimpleLineIcons name="trash" size={24} color="black" />
              </TouchableOpacity>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </SafeAreaView>
  );
};

export default Wishlist;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginHorizontal: 20,
  },
  upperRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    width: SIZES.width - 50,
    marginBottom: SIZES.xSmall,
  },
  title: {
    fontSize: SIZES.xLarge,
    fontFamily: "bold",
    fontWeight: "500",
    letterSpacing: 2,
  },
  favcontainer: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: SIZES.xSmall,
    padding: SIZES.medium,
    borderRadius: SIZES.small,
    backgroundColor: "#FFF",
    ...SHADOWS.medium,
    shadowColor: COLORS.white,
  },
  imageContainer: {
    width: 70,
    backgroundColor: COLORS.secondary,
    borderRadius: SIZES.medium,
    justifyContent: "center",
    alignItems: "center",
  },
  productImg: {
    width: "100%",
    height: 65,
    borderRadius: SIZES.small,
  },
  textContainer: {
    flex: 1,
    marginHorizontal: SIZES.medium,
  },
  productTxt: {
    fontSize: SIZES.medium,
    fontFamily: "bold",
    color: COLORS.primary,
  },
  supplierTxt: {
    fontSize: SIZES.small + 2,
    fontFamily: "regular",
    color: COLORS.tertiary,
    marginTop: 3,
    textTransform: "capitalize",
  },
});
