import { View, Text, StyleSheet } from "react-native";

const InfoBox = ({ title, subtitle, containerStyles, titleStyles }) => {
  return (
    <View style={[styles.container, containerStyles]}>
      <Text style={[styles.title, titleStyles]}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // Add any base styles for the container here if needed
  },
  title: {
    color: '#FFFFFF', // Equivalent to text-white
    textAlign: 'center', // Equivalent to text-center
    fontFamily: 'Poppins-SemiBold', // Replace with the correct font family name
  },
  subtitle: {
    color: '#D1D5DB', // Equivalent to text-gray-100
    textAlign: 'center', // Equivalent to text-center
    fontSize: 14, // Equivalent to text-sm
    fontFamily: 'Poppins-Regular', // Replace with the correct font family name
  },
});

export default InfoBox;
