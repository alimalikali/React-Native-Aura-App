import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";

const CustomButton = ({ title, handlePress, containerStyles, textStyles, isLoading }) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      disabled={isLoading}
      style={[
        styles.button,
        // isLoading && styles.disabled,
        containerStyles // Additional styles from props
      ]}
    >
      <Text style={[styles.text, textStyles]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#FF9C01', // Assuming 'secondary' is a color variable
    borderRadius: 12,
    minHeight: 62,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 1, // Default opacity
  },
  disabled: {
    opacity: 0.5, // Reduced opacity when button is disabled
  },
  text: {
    color: '#161622', // Assuming 'primary' is a color variable
    fontFamily: 'Poppins-SemiBold', // Assuming 'Poppins-SemiBold' is a font family
    fontSize: 18,
  },
});

export default CustomButton;
