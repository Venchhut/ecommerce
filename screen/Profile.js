import React, { useEffect, useState, useContext } from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons, AntDesign } from "react-native-vector-icons";
import { COLORS, SIZES } from "../constants";
import { StatusBar } from "expo-status-bar";
import { CartContext } from "../components/Cart/CartContext";
import { useAuthContext } from "../Contexts/AuthContext";

const Profile = ({ navigation }) => {
  const [userData, setUserData] = useState(null);
  const { count, setCount } = useContext(CartContext);
  const { setAuth } = useAuthContext();
  useEffect(() => {
    checkUserExistence();
  }, []);

  const checkUserExistence = async () => {
    // Placeholder for fetching user data
    const user = {
      username: "Esther Howard",
      email: "esther.howard@example.com",
    };
    setUserData(user);
  };

  const handlePress = (screen) => {
    // // Add your custom logic here
    // console.log(`Navigating to ${screen}`);
    // navigation.navigate(screen);
    if (screen === "HelpCenter") {
      setAuth("");
    }
  };

  const menuItems = [
    { name: "Your profile", icon: "account-outline", screen: "YourProfile" },
    {
      name: "Manage Address",
      icon: "map-marker-outline",
      screen: "Address",
    },
    {
      name: "Payment Methods",
      icon: "credit-card-outline",
      screen: "PaymentMethods",
    },
    { name: "My Orders", icon: "clipboard-list-outline", screen: "MyOrders" },
    { name: "Settings", icon: "cog-outline", screen: "Settings" },
    { name: "Help Center", icon: "help-circle-outline", screen: "HelpCenter" },
  ];

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
        <TouchableOpacity style={styles.editIcon}>
          <AntDesign name="edit" size={26} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.profileName}>
          {userData ? userData.username : "Please login"}
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
