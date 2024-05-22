import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, SIZES } from "../constants";
import Search from "../components/Home/Search.js";
import Slider from "../components/Home/Slider.js";
import Heading from "../components/Home/Heading.js";
import ProductRow from "../components/Product/ProductRow.js";
import Category from "./Category.js";

const Home = () => {
  return (
    <>
      <View style={styles.topnav}>
        <SafeAreaView>
          <View>
            <Search />
          </View>
        </SafeAreaView>
      </View>

      <ScrollView>
        <View>
          <Slider />
        </View>
        <Category />
        <View style={{ marginHorizontal: 10, marginBottom: 120 }}>
          <Heading />
          <ProductRow />
        </View>
      </ScrollView>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  topnav: {
    backgroundColor: COLORS.primary,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },

  container: {
    flex: 1,
    backgroundColor: COLORS.lightWhite,
  },
  appBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  appBarWrapper: {
    marginHorizontal: 12,
    marginTop: 12,
  },
  location: {
    color: COLORS.gray,
    fontFamily: "semibold",
    fontSize: SIZES.medium,
  },
  cartCounter: {
    position: "absolute",
    bottom: 16,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "#FF4747",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 999,
  },
  cartNumber: {
    fontWeight: "600",
    fontSize: 10,
    color: COLORS.white,
  },
});
