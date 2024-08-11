import { useState } from "react";
import { router, usePathname } from "expo-router";
import { View, TouchableOpacity, Image, TextInput, Alert, StyleSheet } from "react-native";

import { icons } from "../constants";

const SearchInput = ({ initialQuery }) => {
  const pathname = usePathname();
  const [query, setQuery] = useState(initialQuery || "");

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        value={query}
        placeholder="Search a video topic"
        placeholderTextColor="#CDCDE0"
        onChangeText={(e) => setQuery(e)}
      />

      <TouchableOpacity
        onPress={() => {
          if (query === "")
            return Alert.alert(
              "Missing Query",
              "Please input something to search results across database"
            );

          if (pathname.startsWith("/search")) router.setParams({ query });
          else router.push(`/search/${query}`);
        }}
      >
        <Image source={icons.search} style={styles.icon} resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 64, // 16 * 4 = 64px
    paddingHorizontal: 16, // 4 * 4 = 16px
    backgroundColor: '#1c1c1e', // Corresponds to bg-black-100
    borderRadius: 24, // Corresponds to rounded-2xl
    borderWidth: 2,
    borderColor: '#2c2c2e', // Corresponds to border-black-200
  },
  textInput: {
    fontSize: 16, // Corresponds to text-base
    marginTop: 2, // Corresponds to mt-0.5
    color: '#ffffff', // Corresponds to text-white
    flex: 1,
    fontFamily: 'Poppins-Regular', // Corresponds to font-pregular
  },
  icon: {
    width: 20, // Corresponds to w-5 (5 * 4px)
    height: 20, // Corresponds to h-5 (5 * 4px)
  },
});

export default SearchInput;
