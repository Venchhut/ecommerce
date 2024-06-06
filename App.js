import { View, ActivityIndicator } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabNavigation from "./navigation/BottomTabNavigation";
import Product from "./screen/Product";
import ProductDetail from "./screen/ProductDetail";
import Cart from "./screen/Cart";
import Wishlist from "./screen/Wishlist";
import { CartProvider } from "./components/Cart/CartContext";
import { AuthProvider, useAuthContext } from "./Contexts/AuthContext";
import Order from "./screen/Order";
import YourProfile from "./screen/Profile/YourProfile";
import Address from "./screen/Profile/Address";
import MyOrders from "./screen/Profile/MyOrders";
import Settings from "./screen/Profile/Settings";
import PaymentMethods from "./screen/PaymentMethods";
import StripePayment from "./screen/Payment/StripePayment";
import ProductCategory from "./screen/ProductCategory";
import Login from "./screen/Auth/Login";
import SignUp from "./screen/Auth/Signup";
import { StripeProvider } from "@stripe/stripe-react-native";
const STRIPE_KEY =
  "pk_test_51OWHOqFraYvbLw8OjTwVjEP64z8mEUCDnGJ7KFia9qXmAXL4NxfjSIlfx0afsOH5zgpk8GaRlKTSIXwbo5yU1hYy00kh2ncCfu";
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <NavigationContainer>
          <StripeProvider publishableKey={STRIPE_KEY}>
            <AuthConsumer />
          </StripeProvider>
        </NavigationContainer>
      </CartProvider>
    </AuthProvider>
  );
};

const AuthConsumer = () => {
  const { auth } = useAuthContext();

  return (
    <Stack.Navigator>
      {auth ? (
        <>
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
          <Stack.Screen
            name="productCategory"
            component={ProductCategory}
            options={{ headerShown: false }}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="signUp"
            component={SignUp}
            options={{ headerShown: false }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default App;
