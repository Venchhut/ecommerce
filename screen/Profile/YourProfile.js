import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { COLORS } from "../../constants";

const ProfileScreen = () => {
  // Mock data
  const [profile, setProfile] = useState({
    name: "Esther Howard",
    phoneNumber: "603.555.0123",
    email: "example@gmail.com",
    gender: "",
  });

  // Handlers
  const handleInputChange = (field, value) => {
    setProfile({ ...profile, [field]: value });
  };

  const handleUpdate = () => {
    // Update profile logic here
    console.log("Profile updated:", profile);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton}>
        <Text style={styles.backButtonText}>←</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Your Profile</Text>
      <View style={styles.profileImageContainer}>
        <Image
          source={{ uri: "https://via.placeholder.com/150" }}
          style={styles.profileImage}
        />
        <TouchableOpacity style={styles.editIcon}>
          <Text style={styles.editIconText}>✏️</Text>
        </TouchableOpacity>
      </View>
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
        <View style={styles.phoneNumberContainer}>
          <TextInput
            style={styles.phoneNumberInput}
            value={profile.phoneNumber}
            onChangeText={(value) => handleInputChange("phoneNumber", value)}
          />
        </View>
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
        <Text style={styles.label}>Gender</Text>
        <TextInput
          style={styles.input}
          value={profile.gender}
          onChangeText={(value) => handleInputChange("gender", value)}
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
  profileImageContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  editIcon: {
    position: "absolute",
    bottom: 0,
    right: 10,
    backgroundColor: "#FF3B30",
    borderRadius: 15,
    padding: 5,
  },
  editIconText: {
    color: "#fff",
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
  phoneNumberContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  phoneNumberInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
    padding: 14,
    backgroundColor: "#F7F7F7",
    fontSize: 14,
  },
  changeText: {
    color: "#FF3B30",
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

export default ProfileScreen;
