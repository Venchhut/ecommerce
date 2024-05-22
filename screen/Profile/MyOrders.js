import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import React from "react";
import { COLORS, SIZES } from "../../constants";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import OrdersList from "../../components/Order/OrdersList";
const MyOrders = ({ navigation }) => {
  return (
    <SafeAreaView>
      <View style={styles.upperRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back-circle" size={30} color={COLORS.black} />
        </TouchableOpacity>
        <Text style={styles.title}>My Order</Text>
      </View>
      <OrdersList />
    </SafeAreaView>
  );
};

export default MyOrders;

const styles = StyleSheet.create({
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
});
