import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabNavigation from "./navigation/BottomTabNavigation.js";
import Product from "./screen/Product.js";
import ProductDetail from "./screen/ProductDetail.js";
import Cart from "./screen/Cart.js";
import Wishlist from "./screen/Wishlist.js";
import { CartProvider } from "./components/Cart/CartContext.js";
import { AuthContext, AuthProvider } from "./Contexts/AuthContext.js";
import Order from "./screen/Order.js";
import YourProfile from "./screen/Profile/YourProfile.js";
import Address from "./screen/Profile/Address.js";
import MyOrders from "./screen/Profile/MyOrders.js";
import Settings from "./screen/Profile/Settings.js";
import Search from "./screen/Search.js";
import PaymentMethods from "./screen/PaymentMethods.js";
import StripePayment from "./screen/Payment/StripePayment.js";
const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Bottom Navigation"
              component={BottomTabNavigation}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Product"
              component={Product}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ProductDetail"
              component={ProductDetail}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Search"
              component={Search}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Cart"
              component={Cart}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Wishlist"
              component={Wishlist}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="PaymentMethods"
              component={PaymentMethods}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="StripePayment"
              component={StripePayment}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Order"
              component={Order}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="YourProfile"
              component={YourProfile}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Address"
              component={Address}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="MyOrders"
              component={MyOrders}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Settings"
              component={Settings}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
