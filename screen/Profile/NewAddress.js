import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
} from "react-native";
import { useAuthContext } from "../../Contexts/AuthContext";
import { SafeAreaView } from "react-native-safe-area-context";

const NewAddress = ({ navigation }) => {
  const { axiosInstanceWithAuth } = useAuthContext();
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");

  const handleSaveAddress = async () => {
    try {
      const newAddressData = {
        street_address: streetAddress,
        city: city,
        country: country,
      };

      await axiosInstanceWithAuth.post("/api/order/address/", newAddressData);
      Alert.alert(
        "Success",
        "Address saved successfully",
        [
          {
            text: "OK",
            onPress: () => navigation.navigate("Profile"),
          },
        ],
        { cancelable: false }
      );
    } catch (error) {
      console.error("Error adding new address:", error);
      Alert.alert(
        "Error",
        "Failed to save address. Please try again later.",
        [
          {
            text: "OK",
            onPress: () => {},
          },
        ],
        { cancelable: false }
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Add New Address</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Street Address</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter street address"
          value={streetAddress}
          onChangeText={setStreetAddress}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>City</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter city"
          value={city}
          onChangeText={setCity}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Country</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter country"
          value={country}
          onChangeText={setCountry}
        />
      </View>
      <TouchableOpacity style={styles.saveButton} onPress={handleSaveAddress}>
        <Text style={styles.saveButtonText}>Save Address</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default NewAddress;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  saveButton: {
    backgroundColor: "#ff4757",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
