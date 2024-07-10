import React, { useEffect, useState, useContext, useCallback } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { MaterialCommunityIcons, AntDesign } from "react-native-vector-icons";
import { COLORS, SIZES } from "../constants";
import { StatusBar } from "expo-status-bar";
import { useAuthContext } from "../Contexts/AuthContext";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { axiosInstanceWithAuth, userIdFromToken, setAuth } = useAuthContext();
  const navigation = useNavigation();

  const fetchUserData = useCallback(
    async (showLoading = true) => {
      if (showLoading) {
        setLoading(true);
      }
      try {
        const res = await axiosInstanceWithAuth.get(
          `/api/user/${userIdFromToken}`
        );
        setUserData(res.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        if (showLoading) {
          setLoading(false);
        }
      }
    },
    [axiosInstanceWithAuth, userIdFromToken]
  );

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  useFocusEffect(
    useCallback(() => {
      fetchUserData(false);
    }, [fetchUserData])
  );

  const handlePress = (screen) => {
    if (screen === "Login") {
      setAuth("");
    }
    navigation.navigate(screen);
  };

  const menuItems = [
    { name: "Your profile", icon: "account-outline", screen: "YourProfile" },
    { name: "Manage Address", icon: "map-marker-outline", screen: "Address" },
    {
      name: "Payment Methods",
      icon: "credit-card-outline",
      screen: "PaymentMethods",
    },
    { name: "My Orders", icon: "clipboard-list-outline", screen: "MyOrders" },
    { name: "Settings", icon: "cog-outline", screen: "Settings" },
    { name: "Log out", icon: "logout", screen: "Login" },
  ];

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.lightWhite} />
      <View style={styles.profileHeader}>
        <Image
          source={{
            uri: "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?size=626&ext=jpg&ga=GA1.1.135576944.1713864297&semt=ais_user_b",
          }} // Replace with the actual image URL
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>
          {userData ? userData.name : "Please login"}
        </Text>
      </View>
      <View style={styles.menuWrapper}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handlePress(item.screen)}
            style={styles.menuItem}
          >
            <View style={styles.menuItemContent}>
              <MaterialCommunityIcons
                name={item.icon}
                color={COLORS.primary}
                size={25}
              />
              <Text style={styles.menuItemText}>{item.name}</Text>
            </View>
            <AntDesign name="right" size={24} color={COLORS.primary} />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightWhite,
  },
  profileHeader: {
    alignItems: "center",
    padding: SIZES.medium,
    marginTop: SIZES.medium,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  editIcon: {
    position: "absolute",
    bottom: 10,
    left: 20,
    backgroundColor: COLORS.lightWhite,
    borderRadius: 15,
    padding: 5,
  },
  profileName: {
    marginTop: SIZES.small,
    fontSize: SIZES.large,
    fontWeight: "bold",
  },
  menuWrapper: {
    marginTop: SIZES.large,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: SIZES.medium,
    paddingHorizontal: SIZES.large,
    borderBottomColor: COLORS.gray,
    borderBottomWidth: 3,
  },
  menuItemContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  menuItemText: {
    marginLeft: SIZES.medium,
    fontSize: SIZES.medium,
    color: COLORS.black,
  },
});

export default Profile;
