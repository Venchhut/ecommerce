// screens/Address.js
import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, TouchableOpacity } from "react-native";
import { useAuthContext } from "../../Contexts/AuthContext";
import { SafeAreaView } from "react-native-safe-area-context";

const Address = ({ navigation }) => {
  const { axiosInstanceWithAuth } = useAuthContext();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axiosInstanceWithAuth.get("/api/order/address/");
      setData(response.data);
    } catch (error) {
      // console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddressSelect = async (id) => {
    setSelectedAddress(id);
    try {
      await axiosInstanceWithAuth.put(`/api/order/address/${id}`);
    } catch (error) {
      console.error("Error updating address:", error);
    }
  };

  const handleAddNewAddress = () => {
    navigation.navigate("NewAddress");
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Shipping Address</Text>
      {data.map((item) => (
        <TouchableOpacity
          style={[
            styles.addressItem,
            selectedAddress === item.id && styles.selectedAddressItem,
          ]}
          onPress={() => handleAddressSelect(item.id)}
          key={item.id}
        >
          <Text style={styles.addressLabel}>
            {item.street_address}, {item.city}, {item.country}
          </Text>
        </TouchableOpacity>
      ))}
      <TouchableOpacity style={styles.addButton} onPress={handleAddNewAddress}>
        <Text style={styles.addButtonText}>+ Add New Shipping Address</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.applyButton}>
        <Text style={styles.applyButtonText}>Apply</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Address;

const styles = {
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  header: {
    fontSize: 22,
    marginBottom: 20,
    color: "#333",
    fontWeight: "bold",
    textAlign: "center",
  },
  addressItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    marginVertical: 8,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#ddd",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  selectedAddressItem: {
    borderColor: "#ff4757",
  },
  addressLabel: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 5,
    color: "#333",
  },
  addButton: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 10,
    borderColor: "#ff4757",
    borderWidth: 1,
  },
  addButtonText: {
    color: "#ff4757",
    fontWeight: "bold",
  },
  applyButton: {
    backgroundColor: "#ff4757",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 10,
  },
  applyButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
};
