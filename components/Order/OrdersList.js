import React from "react";
import { View, FlatList, StyleSheet, ActivityIndicator } from "react-native";
import { COLORS, SIZES } from "../../constants";
import fetchOrders from "../../data/fetchOrders";
import OrderTile from "./OrderTile";

const OrdersList = () => {
  const { data, isLoading, error } = fetchOrders();

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <View style={styles.loading}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Error fetching orders</Text>
      </View>
    );
  }

  return (
    <View>
      <FlatList
        data={data}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <OrderTile item={item} />}
        vertical={true}
        contentContainerStyle={styles.container}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 32,
  },
  separator: {
    height: 16,
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default OrdersList;
