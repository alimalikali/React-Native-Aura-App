import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Video, ResizeMode } from "expo-av";
import { icons } from "../constants";
// const testVideo = "https://www.w3schools.com/html/mov_bbb.mp4";

const VideoCard = ({ title, creator, avatar, thumbnail, video }) => {
  const [play, setPlay] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatarWrapper}>
            <Image source={{ uri: avatar }} style={styles.avatar} resizeMode="cover" />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.title} numberOfLines={1}>{title}</Text>
            <Text style={styles.creator} numberOfLines={1}>{creator}</Text>
          </View>
        </View>
        <View style={styles.menuIconContainer}>
          <Image source={icons.menu} style={styles.menuIcon} resizeMode="contain" />
        </View>
      </View>

      {play ? (
        <Video
          source={{ uri: video }}
          style={styles.video}
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay
          onPlaybackStatusUpdate={(status) => {
            if (status.didJustFinish) setPlay(false);
          }}
        />
      ) : (
        <TouchableOpacity activeOpacity={0.7} onPress={() => setPlay(true)} style={styles.thumbnailContainer}>
          <Image source={{ uri: thumbnail }} style={styles.thumbnail} resizeMode="cover" />
          <Image source={icons.play} style={styles.playIcon} resizeMode="contain" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: "column", alignItems: "center", paddingHorizontal: 16, marginBottom: 56 },
  header: { flexDirection: "row", gap: 12, alignItems: "flex-start" },
  avatarContainer: { flexDirection: "row", flex: 1, alignItems: "center" },
  avatarWrapper: { width: 46, height: 46, borderRadius: 8, borderColor: "#8B8B8B", borderWidth: 1, justifyContent: "center", alignItems: "center", padding: 0.5 },
  avatar: { width: "100%", height: "100%", borderRadius: 8 },
  textContainer: { flex: 1, marginLeft: 12, gap: 4 },
  title: { fontFamily: "Poppins-SemiBold", fontSize: 14, color: "#FFFFFF" },
  creator: { fontFamily: "Poppins-Regular", fontSize: 12, color: "#B0B0B0" },
  menuIconContainer: { paddingTop: 8 },
  menuIcon: { width: 20, height: 20 },
  video: { width: "100%", height: 240, borderRadius: 12, marginTop: 12 },
  thumbnailContainer: { width: "100%", height: 240, borderRadius: 12, marginTop: 12, justifyContent: "center", alignItems: "center", position: "relative" },
  thumbnail: { width: "100%", height: "100%", borderRadius: 12 },
  playIcon: { width: 48, height: 48, position: "absolute" },
});

export default VideoCard;
