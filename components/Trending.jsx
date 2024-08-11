import { useState } from "react";
import { ResizeMode, Video } from "expo-av";
import * as Animatable from "react-native-animatable";
import { FlatList, Image, ImageBackground, TouchableOpacity, StyleSheet, View, Text } from "react-native";
import { icons } from "../constants";
// const testVideo = "https://www.w3schools.com/html/mov_bbb.mp4";



const zoomIn = { 0: { scale: 0.8 }, 1: { scale: 1.1 } };
const zoomOut = { 0: { scale: 1.1 }, 1: { scale: 0.8 } };

const TrendingItem = ({ activeItem, item }) => {
  const [play, setPlay] = useState(false);

  return (
    <Animatable.View style={styles.animatableView} animation={activeItem === item.$id ? zoomIn : zoomOut} duration={500}>
      {play ? (
        <Video source={{ uri: item.video }} style={styles.video} resizeMode={ResizeMode.CONTAIN} useNativeControls shouldPlay onPlaybackStatusUpdate={(status) => { if (status.didJustFinish) { setPlay(false); } }} />
      ) : (
        <TouchableOpacity style={styles.touchableOpacity} activeOpacity={0.7} onPress={() => setPlay(true)}>
          <ImageBackground source={{ uri: item.thumbnail }} style={styles.imageBackground} resizeMode="cover" />
          <Image source={icons.play} style={styles.image} resizeMode="contain" />
        </TouchableOpacity>
      )}
    </Animatable.View>
  );
};

const Trending = ({ posts }) => {
  const [activeItem, setActiveItem] = useState(posts[0]);

  const viewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].key);
    }
  };

  return (
    <FlatList data={posts} horizontal keyExtractor={(item) => item.$id} renderItem={({ item }) => <TrendingItem activeItem={activeItem} item={item} />} onViewableItemsChanged={viewableItemsChanged} viewabilityConfig={{ itemVisiblePercentThreshold: 70 }} contentOffset={{ x: 170 }} />
  );
};

const styles = StyleSheet.create({
  animatableView: { marginRight: 20 }, // Corresponds to mr-5
  video: { width: 208, height: 288, borderRadius: 33, marginTop: 12, backgroundColor: 'rgba(255, 255, 255, 0.1)' }, // Corresponds to w-52, h-72, mt-3, bg-white/10
  touchableOpacity: { position: 'relative', justifyContent: 'center', alignItems: 'center' },
  imageBackground: { width: 208, height: 288, borderRadius: 33, marginVertical: 20, overflow: 'hidden', shadowColor: 'rgba(0, 0, 0, 0.4)', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.8, shadowRadius: 2 }, // Corresponds to w-52, h-72, my-5, shadow-black/40
  image: { width: 48, height: 48, position: 'absolute' }, // Corresponds to w-12, h-12
  textFake: { color: 'white' }
});

export default Trending;
