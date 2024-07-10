import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Text,
} from "react-native";
import { COLORS, SIZES } from "../../constants";
import OrderTile from "./OrderTile";
import { useAuthContext } from "../../Contexts/AuthContext";

const OrdersList = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { axiosInstanceWithAuth } = useAuthContext();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axiosInstanceWithAuth.get("/api/order");
        setData(response.data);
      } catch (err) {
        setError("Error fetching orders");
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [axiosInstanceWithAuth]);

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
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) =>
          item.OrderItems.map((orderItem) => (
            <OrderTile key={orderItem.id} item={orderItem} />
          ))
        }
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
