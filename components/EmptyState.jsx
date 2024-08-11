import { router } from "expo-router";
import { View, Text, Image, StyleSheet, Button } from "react-native";

import { images } from "../constants";
import CustomButton from "./customButton";

const EmptyState = ({ title, subtitle }) => {
  return (
    <View style={styles.container}>
      <Image
        source={images.empty}
        resizeMode="contain"
        style={styles.image}
      />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
      <CustomButton
        title="Back to Explore"
        handlePress={() => router.push("/home")}
        containerStyles={styles.buttonContainer}
      />
     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16, // Corresponds to px-4
  },
  image: {
    width: 270, // Corresponds to w-[270px]
    height: 216, // Corresponds to h-[216px]
  },
  title: {
    fontSize: 14, // Corresponds to text-sm
    fontFamily: 'Poppins-Medium', // Assuming 'font-pmedium' corresponds to this font family
    color: '#CDCDE0', // Corresponds to text-gray-100
  },
  subtitle: {
    fontSize: 20, // Corresponds to text-xl
    textAlign: 'center', // Corresponds to text-center
    fontFamily: 'Poppins-SemiBold', // Assuming 'font-psemibold' corresponds to this font family
    color: '#FFFFFF', // Corresponds to text-white
    marginTop: 8, // Corresponds to mt-2 (2 * 4 = 8px)
  },
  buttonContainer: {
    width: '100%', // Corresponds to w-full
    marginVertical: 20, // Corresponds to my-5 (5 * 4 = 20px)
  },
});

export default EmptyState;
