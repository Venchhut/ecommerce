// import { SafeAreaView } from "react-native-safe-area-context";
// import { Ionicons, Feather } from "@expo/vector-icons";
// import { SIZES, COLORS } from "../constants";
// import React, { useState } from "react";
// import {
//   View,
//   TextInput,
//   FlatList,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   Image,
// } from "react-native";
// import SearchTile from "../components/Search/SearchTile";

// const mockData = [
//   {
//     _id: "1",
//     title: "Product 1",
//     supplier: "Supplier A",
//     price: "$10.00",
//     imageUrl:
//       "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/ipad-air-5.png",
//   },
//   {
//     _id: "2",
//     title: "Product 2",
//     supplier: "Supplier B",
//     price: "$20.00",
//     imageUrl:
//       "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/ipad-air-5.png",
//   },
//   // Add more mock data as needed
// ];

// const Search = () => {
//   const [searchKey, setSearchKey] = useState("");
//   const [searchResults, setSearchResults] = useState([]);

//   const handleSearch = () => {
//     // For now, we'll use mock data instead of fetching from API
//     const results = mockData.filter((item) =>
//       item.title.toLowerCase().includes(searchKey.toLowerCase())
//     );
//     setSearchResults(results);
//   };

//   return (
//     <SafeAreaView
//       style={{
//         flex: 1,
//         backgroundColor: COLORS.lightWhite,
//         paddingHorizontal: 20,
//       }}
//     >
//       <View style={styles.searchContainer}>
//         <TouchableOpacity>
//           <Feather
//             style={styles.searchIcon}
//             name="camera"
//             size={24}
//             color="black"
//           />
//         </TouchableOpacity>
//         <View style={styles.searchWrapper}>
//           <TextInput
//             style={styles.searchInput}
//             value={searchKey}
//             onChangeText={setSearchKey}
//             placeholder="What are you looking for?"
//           />
//         </View>
//         <TouchableOpacity style={styles.searchBtn} onPress={handleSearch}>
//           <Ionicons name="search" size={SIZES.xLarge} color={COLORS.offwhite} />
//         </TouchableOpacity>
//       </View>
//       {searchResults.length === 0 ? (
//         <View
//           style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
//         >
//           <Image
//             source={{
//               uri: "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/ipad-air-5.png",
//             }}
//             style={styles.searchImage}
//           />
//         </View>
//       ) : (
//         <FlatList
//           data={searchResults}
//           keyExtractor={(item) => item._id}
//           renderItem={({ item }) => <SearchTile item={item} />}
//         />
//       )}
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   searchContainer: {
//     justifyContent: "center",
//     alignItems: "center",
//     flexDirection: "row",
//     backgroundColor: COLORS.secondary,
//     borderRadius: SIZES.medium,
//     marginVertical: SIZES.medium,
//     height: 50,
//   },
//   searchImage: {
//     resizeMode: "contain",
//     width: SIZES.width - 100,
//     height: SIZES.height - 300,
//     opacity: 0.9,
//   },
//   searchWrapper: {
//     flex: 1,
//     backgroundColor: COLORS.secondary,
//     marginRight: SIZES.small,
//     justifyContent: "center",
//     alignItems: "center",
//     borderRadius: SIZES.small,
//     height: "100%",
//   },
//   searchInput: {
//     fontFamily: "regular",
//     width: "100%",
//     height: "100%",
//     paddingHorizontal: SIZES.medium,
//   },
//   searchBtn: {
//     width: 50,
//     height: "100%",
//     backgroundColor: COLORS.primary,
//     borderRadius: SIZES.medium,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   searchIcon: {
//     marginRight: 10,
//     marginLeft: 10,
//     color: "gray",
//   },
// });

// export default Search;
import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Search = () => {
  return (
    <View>
      <Text>Search</Text>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({});
