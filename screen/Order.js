import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { useAuthContext } from "../Contexts/AuthContext";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const { axiosInstanceWithAuth } = useAuthContext(); // Correctly call the context

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axiosInstanceWithAuth.post("/api/order/cash", {
          productCart: [], // Provide valid productCart data
          amount: 0, // Provide a valid amount
        });
        setOrders(response.data); // Use response.data to access the orders
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, []);

  const renderOrderItem = ({ item }) => (
    <View style={styles.orderItem}>
      <Text style={styles.orderTitle}>Order ID: {item.id}</Text>
      <Text style={styles.orderText}>Email: {item.email}</Text>
      <Text style={styles.orderText}>Payment Method: {item.payment}</Text>
      <Text style={styles.orderText}>Total Amount: ${item.amount}</Text>
      <Text style={styles.orderText}>Phone: {item.phone}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Orders</Text>
      <FlatList
        data={orders}
        renderItem={renderOrderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default Order;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  orderItem: {
    padding: 16,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    marginBottom: 16,
  },
  orderTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  orderText: {
    fontSize: 16,
    marginTop: 4,
  },
});
