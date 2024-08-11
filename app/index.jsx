import { StatusBar } from "expo-status-bar";
import React from "react";
import { Image, ScrollView, Text, View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../constants";
import { Redirect, router } from "expo-router";
import CustomButton from "../components/customButton";
import { colors } from "../constants/color";
import { useGlobalContext } from "../context/GlobalProvider";

export default function App() {
  const { loading, isLogged } = useGlobalContext();

  if (!loading && isLogged) return <Redirect href="/home" />;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.logoContainer}>
          <Image
            source={images.logo}
            style={styles.logo}
            resizeMode="contain"
          />
          <Image
            source={images.cards}
            style={styles.cards}
            resizeMode="contain"
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>
            Discover Endless{"\n"}
            Possibilities with{" "}
            <Text style={styles.secondaryTitle}>Aora</Text>
          </Text>
          <Image
            source={images.path}
            style={styles.imagePath}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.description}>
          Where Creativity Meets Innovation: Embark on a Journey of Limitless
          Exploration with Aora 
        </Text>
        <CustomButton
          title="Continue with Email"
          handlePress={() => router.push("/sign-in")}
          containerStyles={styles.button}
        />
      </ScrollView>
      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#161622"
  },
  scrollViewContent: {
    flexGrow: 1,
    padding: 20,
    justifyContent: "center",
  },
  logoContainer: {
    alignItems: "center",
  },
  logo: {
    width: 130,
    height: 84,
  },
  cards: {
    maxWidth: 380,
    width: "100%",
    height: 298,
  },
  textContainer: {
    marginTop: 5,
    position: "relative",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  secondaryTitle: {
    color: colors.secondary,
  },
  imagePath: {
    width: 136,
    height: 15,
    position: "absolute",
    bottom: -5,
    right: -18,
  },
  description: {
    fontSize: 14,
    color: "white",
    marginTop: 7,
    textAlign: "center",
  },
  button: {
    width: "100%",
    marginTop: 7,
  },
});
