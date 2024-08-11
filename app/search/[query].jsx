import { useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import useAppwrite from "../../lib/useAppwrite";
import { searchPosts } from "../../lib/appwrite";
import VideoCard from "../../components/VideoCard";
import SearchInput from "../../components/SearchInput";
import EmptyState from "../../components/EmptyState";
// const testVideo = "https://www.w3schools.com/html/mov_bbb.mp4";


const Search = () => {
  const { query } = useLocalSearchParams();
  const { data: posts, refetch } = useAppwrite(() => searchPosts(query));

  useEffect(() => {
    refetch();
  }, [query]);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <VideoCard
            title={item.title}
            thumbnail={item.thumbnail}
            video={item.video}
            creator={item.creator.username}
            avatar={item.creator.avatar}
          />
        )}
        ListHeaderComponent={() => (
          <View style={styles.headerContainer}>
            <Text style={styles.searchResultsText}>Search Results</Text>
            <Text style={styles.queryText}>{query}</Text>
            <View style={styles.searchInputContainer}>
              <SearchInput initialQuery={query} refetch={refetch} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="No videos found for this search query"
          />
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: "black", height: "100%" },
  headerContainer: { flex: 1, marginVertical: 24, paddingHorizontal: 16 },
  searchResultsText: { fontFamily: "Poppins-Medium", color: "#D3D3D3", fontSize: 14 },
  queryText: { fontFamily: "Poppins-SemiBold", color: "#FFFFFF", fontSize: 24, marginTop: 4 },
  searchInputContainer: { marginTop: 24, marginBottom: 32 },
});

export default Search;
