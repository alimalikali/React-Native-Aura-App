import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Image, FlatList, TouchableOpacity, StyleSheet } from "react-native";

import { icons } from "../../constants";
import useAppwrite from "../../lib/useAppwrite";
import { getUserPosts, signOut } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";
import EmptyState from "../../components/EmptyState";
import VideoCard from "../../components/VideoCard";
import InfoBox from "../../components/InfoBox";

const Profile = () => {
  const { user, setUser, setIsLogged } = useGlobalContext();
  const { data: posts } = useAppwrite(() => getUserPosts(user.$id));

  const logout = async () => {
    await signOut();
    setUser(null);
    setIsLogged(false);

    router.replace("/sign-in");
  };

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
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="No videos found for this profile"
          />
        )}
        ListHeaderComponent={() => (
          <View style={styles.listHeaderContainer}>
            <TouchableOpacity onPress={logout} style={styles.logoutButton}>
              <Image
                source={icons.logout}
                resizeMode="contain"
                style={styles.logoutIcon}
              />
            </TouchableOpacity>

            <View style={styles.avatarContainer}>
              <Image
                source={{ uri: user?.avatar }}
                style={styles.avatarImage}
                resizeMode="cover"
              />
            </View>

            <InfoBox
              title={user?.username}
              containerStyles={styles.infoBoxTitle}
              titleStyles="text-lg"
            />

            <View style={styles.infoBoxRow}>
              <InfoBox
                title={posts.length || 0}
                subtitle="Posts"
                titleStyles="text-xl"
                containerStyles={styles.infoBoxMarginRight}
              />
              <InfoBox
                title="1.2k"
                subtitle="Followers"
                titleStyles="text-xl"
              />
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black', // Use the primary color defined in your theme
    flex: 1,
  },
  listHeaderContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 6,
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  logoutButton: {
    flex: 1,
    alignItems: 'flex-end',
    marginBottom: 10,
    marginRight: 6,
    width : '100%'
  },
  logoutIcon: {
    width: 24,
    height: 24,
  },
  avatarContainer: {
    width: 64,
    height: 64,
    borderWidth: 1,
    borderColor: '#FF9C01', // Use the secondary color defined in your theme
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10
  },
  avatarImage: {
    width: '90%',
    height: '90%',
    borderRadius: 16,
  },
  infoBoxTitle: {
    fontSize: 18,
  },
  infoBoxRow: {
    marginTop: 5,
    flexDirection: 'row',
  },
  infoBoxMarginRight: {
    marginRight: 10,
  },
});
export default Profile;

