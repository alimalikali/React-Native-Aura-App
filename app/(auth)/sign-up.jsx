import React, { useState } from "react";
import { Image, ScrollView, Text, View, StyleSheet, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import FormField from "../../components/FormField";
import CustomButton from "../../components/customButton";
import { Link, router } from "expo-router";
import { colors } from "../../constants/color.js";
import { createUser } from "../../lib/appwrite.js";
import { useGlobalContext } from "../../context/GlobalProvider.js";


const SignUp = () => {
  const { setUser, setIsLogged } = useGlobalContext();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [isSubmitting, setSubmitting] = useState(false);

  const submit = async(email ,password ,username) => {
    if (form.username === "" || form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all fields");
    }
    setSubmitting(true);
    try {
      const result = await createUser(form.email, form.password, form.username);
      setUser(result);
      setIsLogged(true);

      router.replace("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.innerContainer}>
          <Image
            source={images.logo}
            resizeMode="contain"
            style={styles.logo}
          />
          <Text style={styles.headerText}>Sign Up to Aora</Text>
          <FormField
            title="Username"
            value={form.username}
            handleChangeText={(e) => setForm({ ...form, username: e })}
            otherStyles={styles.input}
          />
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles={styles.input}
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles={styles.input}
          />
          <CustomButton
            title="Sign Up"
            containerStyles={styles.button}
            isLoading={isSubmitting}
            handlePress={submit}
          />
          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>Have an account already?</Text>
            <Link href="/sign-in" style={styles.signupLink}>
              Sign in
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#161622",
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
    justifyContent: "center",
  },
  contentContainer: {
    alignItems: "flex-start",
    gap: 10,
    width: "100%",
  },
  logo: {
    width: 115,
    height: 34,
    marginTop: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginTop: 10,
  },
  input: {
    marginTop: 7,
  },
  button: {
    width: "100%",
    marginTop: 7,
  },
  signupContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    paddingTop: 5,
    gap: 3,
  },
  signupText: {
    fontSize: 14,
    color: "#CDCDE0",
    fontFamily: "Poppins-Regular",
  },
  signupLink: {
    fontSize: 14,
    fontFamily: "Poppins-SemiBold",
    color: colors.secondary,
    marginLeft: 2,
  },
});
export default SignUp;
