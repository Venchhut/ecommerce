import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  Text,
} from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";
import { COLORS, SIZES } from "../../constants";
import { useNavigation } from "@react-navigation/native";

const Search = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigation.navigate("SearchResultsScreen", { searchQuery });
      setSearchQuery("");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.locationContainer}>
        <Ionicons name="location-sharp" size={16} color="white" />
        <Text style={styles.locationText}>New York, USA</Text>
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
          onSubmitEditing={handleSearch} // Trigger search when user submits
        />
        <TouchableOpacity style={styles.filterIcon} onPress={handleSearch}>
          <Ionicons name="options-outline" size={24} color="black" />
        </TouchableOpacity>
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
