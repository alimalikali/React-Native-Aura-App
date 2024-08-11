import React, { useState } from "react";
import { FlatList, Image, RefreshControl, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import EmptyState from "../../components/EmptyState";
import SearchInput from "../../components/SearchInput";
import Trending from "../../components/Trending";
import VideoCard from "../../components/VideoCard";
import { images } from "../../constants";
import { getAllPosts, getLatestPosts } from "../../lib/appwrite";
import useAppwrite from "../../lib/useAppwrite";

const Home = () => {
  const { data: posts, refetch } = useAppwrite(getAllPosts);
  const { data: latestPosts, refetchLatestPosts } = useAppwrite(getLatestPosts);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={posts}
        keyExtractor={(item) => (item.id ? item.id.toString() : Math.random().toString())} 
        renderItem={({ item }) => (
          <VideoCard title={item.title} thumbnail={item.thumbnail} video={item.video} creator={item.creator.username} avatar={item.creator.avatar} />
        )}
        ListHeaderComponent={() => (
          <View style={styles.headerContainer}>
            <View style={styles.headerInnerContainer}>
              <View>
                <Text style={styles.welcomeText}>Welcome Back</Text>
                <Text style={styles.userName}>ALI MALIK</Text>
              </View>
              <View style={styles.logoContainer}>
                <Image source={images.logoSmall} style={styles.logo} resizeMode="contain" />
              </View>
            </View>
            <SearchInput />
            <View style={styles.latestVideosContainer}>
              <Text style={styles.latestVideosText}>Latest Videos</Text>
              <Trending posts={latestPosts} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => <EmptyState title="No Videos Found" subtitle="No videos created yet" />}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "black", paddingTop: -100, height: "100%" },
  items: { color: "white" },
  headerContainer: { marginVertical: 24, paddingHorizontal: 16 },
  headerInnerContainer: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 },
  welcomeText: { fontFamily: "", fontSize: 14, color: "#6B7280" },
  userName: { fontFamily: "", fontSize: 24, color: "#FFFFFF" },
  logoContainer: { marginTop: 6 },
  logo: { width: 36, height: 40 },
  latestVideosContainer: { width: "100%", flex: 1, paddingTop: 20, paddingBottom: 32 },
  latestVideosText: { fontSize: 18, fontFamily: "Poppins-Regular", color: "#cdcde0", marginBottom: 12 },
});

export default Home;
