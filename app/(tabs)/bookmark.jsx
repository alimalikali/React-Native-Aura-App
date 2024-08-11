import React, { useState } from 'react';
import { Text, View, StyleSheet, SafeAreaView, FlatList, TouchableOpacity, Alert } from 'react-native';

const Bookmark = () => {
  const [bookmarks, setBookmarks] = useState([
    { id: '1', title: 'Bookmark 1', description: 'This is description for bookmark.' },
    { id: '2', title: 'Bookmark 2', description: 'This is description for bookmark.' },
    { id: '3', title: 'Bookmark 3', description: 'This is description for bookmark.' },
  ]);

  const handleDelete = (id) => {
    Alert.alert('Confirm Deletion', 'Are you sure you want to delete this bookmark?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Delete',
        onPress: () => {
          setBookmarks(bookmarks.filter(bookmark => bookmark.id !== id));
        },
      },
    ]);
  };

  const renderItem = ({ item }) => (
    <View style={styles.bookmarkCard}>
      <Text style={styles.bookmarkTitle}>{item.title}</Text>
      <Text style={styles.bookmarkDescription}>{item.description}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => Alert.alert('Details', `Details for ${item.title}`)}>
          <Text style={styles.buttonText}>View Details</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleDelete(item.id)}>
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Bookmarks</Text>
      <FlatList
        data={bookmarks}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 24,
    backgroundColor: '#1a1a1a', // Background color
  },
  header: {
    fontSize: 32,
    color: '#ffffff',
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 20,
  },
  listContainer: {
    paddingBottom: 20,
  },
  bookmarkCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    elevation: 4,
  },
  bookmarkTitle: {
    fontSize: 20,
    color: '#ffffff',
    fontFamily: 'Poppins-Medium',
    marginBottom: 8,
  },
  bookmarkDescription: {
    fontSize: 16,
    color: '#cccccc',
    marginBottom: 12,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#FF9C01',
    borderRadius: 4,
    padding: 8,
    width: '48%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },
});

export default Bookmark;
