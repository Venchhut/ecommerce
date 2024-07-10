import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  Text,
  ActivityIndicator,
} from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";
import { COLORS, SIZES } from "../../constants";
import { useNavigation } from "@react-navigation/native";
import { useAuthContext } from "../../Contexts/AuthContext";

const Search = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [address, setAddress] = useState(null);
  const { axiosInstanceWithAuth } = useAuthContext();

  // Fetch all products when the component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await axiosInstanceWithAuth.get(`/api/product`);
        setProducts(res.data.products);
      } catch (error) {
        console.error("Error fetching products: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [axiosInstanceWithAuth]);

  // Fetch the address data initially and set up a polling mechanism
  useEffect(() => {
    const fetchAddress = async () => {
      setLoading(true);
      try {
        const res = await axiosInstanceWithAuth.get(`/api/order/address/`);
        if (res.data.length > 0) {
          setAddress(res.data[0]);
        }
      } catch (error) {
        // console.error("Error fetching address: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAddress();

    // Set up polling to update the address every 30 seconds (adjust as needed)
    const intervalId = setInterval(fetchAddress, 30000);

    return () => clearInterval(intervalId);
  }, [axiosInstanceWithAuth]);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      setLoading(true);
      try {
        const filteredProducts = products.filter((product) =>
          product.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        navigation.navigate("SearchResultsScreen", { filteredProducts });
        setSearchQuery("");
      } catch (error) {
        console.error("Error filtering products: ", error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.locationContainer}>
        <Ionicons name="location-sharp" size={16} color="white" />
        <Text style={styles.locationText}>
          {address
            ? `${address.street_address}, ${address.city}`
            : "Loading..."}
        </Text>
        <Ionicons name="chevron-down" size={16} color="white" />
        <TouchableOpacity style={styles.notificationIcon}>
          <Ionicons name="notifications-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <View style={styles.searchContainer}>
        <Feather
          style={styles.searchIcon}
          name="search"
          size={24}
          color="black"
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor="gray"
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch}
        />
        {loading ? (
          <ActivityIndicator size="small" color={COLORS.primary} />
        ) : (
          <TouchableOpacity style={styles.filterIcon} onPress={handleSearch}>
            <Ionicons name="options-outline" size={24} color="black" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.primary,
    padding: 16,
    borderRadius: SIZES.medium,
    marginVertical: SIZES.medium,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  locationText: {
    color: "white",
    marginLeft: 8,
    marginRight: 8,
    fontSize: 16,
  },
  notificationIcon: {
    marginLeft: "auto",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: SIZES.medium,
    paddingHorizontal: 8,
    height: 50,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: "100%",
    color: "black",
  },
  filterIcon: {
    marginLeft: 8,
  },
});
