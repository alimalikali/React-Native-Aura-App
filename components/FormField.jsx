import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from "react-native";
import { icons } from "../constants";

const FormField = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={[styles.container, otherStyles]}>
      <Text style={styles.label}>{title}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7B7B8B"
          onChangeText={handleChangeText}
          secureTextEntry={title === "Password" && !showPassword}
          {...props}
        />
        {title === "Password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={!showPassword ? icons.eye : icons.eyeHide}
              style={styles.eyeIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  label: {
    color: "#FFF",
    fontSize: 16,
    fontFamily: "Poppins-Medium",
  },
  inputContainer: {
    width: '100%',
    height: 64, // 16*4
    paddingHorizontal: 16, // 4*4
    backgroundColor: "#1E1E2D", // equivalent to black-100
    borderRadius: 20, // rounded-2xl
    borderWidth: 2,
    borderColor: "#232533", // equivalent to black-200
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    color: "#FFF",
    fontFamily: "Poppins-SemiBold",
    fontSize: 16,
  },
  eyeIcon: {
    width: 20,
    height: 20,
    tintColor: "#FFF",
  },
});

export default FormField;
