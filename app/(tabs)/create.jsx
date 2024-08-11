import { useState } from "react";
import { router } from "expo-router";
import { ResizeMode, Video } from "expo-av";
import * as DocumentPicker from "expo-document-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, Alert, Image, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { icons } from "../../constants";
import { createVideoPost } from "../../lib/appwrite";
import FormField from "../../components/FormField";
import CustomButton from "../../components/customButton";
import { useGlobalContext } from "../../context/GlobalProvider";

const Create = () => {
  const { user } = useGlobalContext();
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({ title: "", video: null, thumbnail: null, prompt: "" });

  const openPicker = async (selectType) => {
    const result = await DocumentPicker.getDocumentAsync({
      type: selectType === "image" ? ["image/png", "image/jpg"] : ["video/mp4", "video/gif"],
    });
    if (!result.canceled) {
      if (selectType === "image") {setForm({...form,thumbnail:result.assets[0]})}
      if (selectType === "video") {setForm({...form,video:    result.assets[0]})}
    } else {
      setTimeout(() => { Alert.alert("Document picked", JSON.stringify(result, null, 2)); }, 100);
    }
  };

  const submit = async () => {
    const { title, video, thumbnail, prompt } = form;
    if (!title || !video || !thumbnail || !prompt) {
      return Alert.alert("Please provide all fields");
    }
    setUploading(true);
    try {
      await createVideoPost({ ...form, userId: user.$id });
      Alert.alert("Success", "Post uploaded successfully");
      router.push("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setForm({ title: "", video: null, thumbnail: null, prompt: "" });
      setUploading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.title}>Upload Video</Text>
        <FormField title="Video Title" value={form.title} placeholder="Give your video a catchy title..." handleChangeText={(e) => setForm({ ...form, title: e })} otherStyles={styles.formField} />
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Upload Video</Text>
          <TouchableOpacity onPress={() => openPicker("video")}>
            {form.video ? (
              <Video source={{ uri: form.video.uri }} style={styles.video} useNativeControls resizeMode={ResizeMode.COVER} isLooping />
            ) : (
              <View style={styles.uploadContainer}>
                <View style={styles.uploadIconContainer}>
                  <Image source={icons.upload} style={styles.uploadIcon} resizeMode="contain" />
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Thumbnail Image</Text>
          <TouchableOpacity onPress={() => openPicker("image")}>
            {form.thumbnail ? (
              <Image source={{ uri: form.thumbnail.uri }} style={styles.thumbnail} resizeMode="cover" />
            ) : (
              <View style={styles.uploadThumbnailContainer}>
                <Image source={icons.upload} style={styles.uploadIconSmall} resizeMode="contain" />
                <Text style={styles.chooseFileText}>Choose a file</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <FormField title="AI Prompt" value={form.prompt} placeholder="The AI prompt of your video..." handleChangeText={(e) => setForm({ ...form, prompt: e })} otherStyles={styles.formField} />
        <CustomButton title="Submit & Publish" handlePress={submit} containerStyles={styles.submitButton} isLoading={uploading} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000000', height: '100%' },
  contentContainer: { paddingHorizontal: 16, paddingBottom: 16 },
  title: { fontSize: 24, color: '#FFFFFF', fontFamily: 'Poppins-SemiBold' },
  formField: { marginTop: 40 },
  fieldContainer: { marginTop: 28, spaceY: 8 },
  label: { fontSize: 16, color: '#D1D5DB', fontFamily: 'Poppins-Medium' },
  video: { width: '100%', height: 256, borderRadius: 16 },
  uploadContainer: { width: '100%', height: 160, paddingHorizontal: 16, backgroundColor: '#1A1A1A', borderRadius: 16, borderColor: '#333333', borderWidth: 1, justifyContent: 'center', alignItems: 'center' },
  uploadIconContainer: { width: 56, height: 56, borderColor: '#FF9C01', borderStyle: 'dashed', borderWidth: 1, justifyContent: 'center', alignItems: 'center' },
  uploadIcon: { width: '50%', height: '50%' },
  uploadThumbnailContainer: { width: '100%', height: 64, paddingHorizontal: 16, backgroundColor: '#1A1A1A', borderRadius: 16, borderWidth: 2, borderColor: '#333333', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', spaceX: 8 },
  uploadIconSmall: { width: 20, height: 20 },
  chooseFileText: { fontSize: 14, color: '#D1D5DB', fontFamily: 'Poppins-Medium' },
  thumbnail: { width: '100%', height: 256, borderRadius: 16 },
  submitButton: { marginTop: 28 }
});

export default Create;
