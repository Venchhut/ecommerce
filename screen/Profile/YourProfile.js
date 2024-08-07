import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useAuthContext } from "../../Contexts/AuthContext";
import { useNavigation, useRoute } from "@react-navigation/native";

const YourProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newPassword, setNewPassword] = useState("");
  const { axiosInstanceWithAuth, userIdFromToken } = useAuthContext();
  const navigation = useNavigation();
  const route = useRoute();
  const onGoBack = route.params?.onGoBack;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axiosInstanceWithAuth.get(
          `/api/user/${userIdFromToken}`
        );
        const { name, email, phoneNumber } = res.data;
        setProfile({ name, email, phoneNumber });
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [axiosInstanceWithAuth, userIdFromToken]);

  const handleInputChange = (field, value) => {
    setProfile({ ...profile, [field]: value });
  };

  const handleUpdate = async () => {
    try {
      const updateData = {
        name: profile.name,
        email: profile.email,
        phoneNumber: profile.phoneNumber,
      };
      if (newPassword) {
        updateData.password = newPassword;
      }
      const res = await axiosInstanceWithAuth.patch(
        `/api/user/${userIdFromToken}`,
        updateData
      );
      setProfile(res.data);
      setNewPassword("");
      Alert.alert("Success", "Profile updated successfully!", [
        {
          text: "OK",
          onPress: () => {
            if (onGoBack) onGoBack();
            navigation.navigate("Profile");
          },
        },
      ]);
    } catch (error) {
      console.error("Error updating profile:", error);
      console.error("Response data:", error.response.data);
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!profile) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Profile not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}></Text>
      </TouchableOpacity>
      <Text style={styles.title}>Your Profile</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          value={profile.name}
          onChangeText={(value) => handleInputChange("name", value)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          style={styles.input}
          value={profile.phoneNumber}
          onChangeText={(value) => handleInputChange("phoneNumber", value)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={profile.email}
          onChangeText={(value) => handleInputChange("email", value)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          value={newPassword}
          secureTextEntry={true}
          onChangeText={(value) => setNewPassword(value)}
          placeholder="Enter new password"
        />
      </View>
      <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
        <Text style={styles.updateButtonText}>Update</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  backButton: {
    alignSelf: "flex-start",
    marginBottom: 10,
  },
  backButtonText: {
    fontSize: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    alignSelf: "center",
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    marginBottom: 5,
    color: "#8A8A8A",
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
    padding: 14,
    backgroundColor: "#F7F7F7",
    fontSize: 14,
  },
  updateButton: {
    backgroundColor: "#FF3B30",
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 20,
  },
  updateButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default YourProfile;
