import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { COLORS, SIZES } from "../../constants";
const Heading = ({ title, navigateTo }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>New</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Product")}>
          <Text style={styles.title}>See All</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Heading;

const styles = StyleSheet.create({
  container: {
    marginTop: SIZES.medium,
    marginBottom: -SIZES.xSmall,
    paddingRight: 5,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: SIZES.xLarge,
    fontFamily: "bold",
    color: COLORS.black,
  },
  title: {
    fontFamily: "bold",
    fontSize: SIZES.large,
  },
});
