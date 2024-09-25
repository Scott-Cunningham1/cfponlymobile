import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet, TouchableOpacity } from 'react-native';
import postMessage from '../common/postMessage';
import getUser from '../common/getUser';
import getMessages from '../common/getMessages';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Board = async () => {

  const getDashInfo = useCallback(async () => {
    try {
  const [inputText, setInputText] = useState('');
  const [user, setUser] = useState({});

  const tokenData = await AsyncStorage.getItem('token')
  const usernameTemp = await AsyncStorage.getItem('username');
  const userData = await getUser(tokenData, usernameTemp)
  console.log('user:', userData)
  setUser(userData)
} catch (error) {
  console.error('Error fetching dashboard info:', error);
} finally {
  setExecuting(false);
}
}, [user]);



  const handleSubmit = async () => {
    // Ensure message text is not empty
    if (!inputText.trim()) {
        Alert.alert('Error', 'Message cannot be empty.');
        return;
    }

    const message = {
        user_id: user.id,
        text: inputText,
        created_at: new Date().toISOString(),
    };

    try {
        const result = await postMessage(tokenData, message);
        console.log('Message posted:', result);
        // Optionally clear the input or update state/UI
        setText('');
        Alert.alert('Success', 'Message posted successfully!');
    } catch (error) {
        console.error('Error submitting message:', error);
        Alert.alert('Error', 'Failed to post message.');
    }
};



  const renderMessage = ({ item }) => (
    <View style={styles.messageItem}>
      <Text style={styles.messageUser}>{item.user}:</Text>
      <Text style={styles.messageText}>{item.text}</Text>
      <TouchableOpacity onPress={() => deleteMessage(item.id)} style={styles.deleteButton}>
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
  useEffect(() => {
    // This effect runs whenever the messages state changes
    console.log("Messages updated:", message);
  }, [message]);
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={inputText}
        onChangeText={setInputText}
        placeholder="Type your message"
      />
      <Button title="Send" onPress={handleSubmit} />
      {/* <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        style={styles.messageList}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  messageList: {
    marginTop: 10,
  },
  messageItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  messageUser: {
    fontWeight: 'bold',
  },
  messageText: {
    flex: 1,
    marginLeft: 10,
  },
  deleteButton: {
    backgroundColor: '#fe813b',
    padding: 5,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: '#fff',
  },
});

export default Board;
