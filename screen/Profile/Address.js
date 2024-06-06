import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import addresses from "./mockData";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
const Address = () => {
  const [selectedAddress, setSelectedAddress] = useState(null);

  const handleAddressSelect = (id) => {
    setSelectedAddress(id);
  };
  const navigation = useNavigation();
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.addressItem,
        selectedAddress === item.id && styles.selectedAddressItem,
      ]}
      onPress={() => handleAddressSelect(item.id)}
    >
      <View style={styles.radioCircle}>
        {selectedAddress === item.id && <View style={styles.selectedRb} />}
      </View>
      <View style={styles.addressDetails}>
        <Text style={styles.addressLabel}>{item.label}</Text>
        <Text style={styles.addressText}>{item.address}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Shipping Address</Text>
      <FlatList
        data={addresses}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>+ Add New Shipping Address</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.applyButton}>
        <Text style={styles.applyButtonText}>Apply</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Address;

const styles = StyleSheet.create({
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
  radioCircle: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#ff4757",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
  },
  selectedRb: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#ff4757",
  },
  addressDetails: {
    flex: 1,
  },
  addressLabel: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 5,
    color: "#333",
  },
  addressText: {
    color: "#666",
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
});
