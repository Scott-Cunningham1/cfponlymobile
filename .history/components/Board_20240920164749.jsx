import React, { useState, useCallback, useRef } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, TextInput, Button, FlatList, Text, StyleSheet, TouchableOpacity, Alert, Dimensions } from 'react-native';
import postMessage from '../common/postMessage';
import getUser from '../common/getUser';
import getMessages from '../common/getMessages';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { height, width } = Dimensions.get('window');


function Board() {

  const [inputText, setInputText] = useState('');
  const [user, setUser] = useState({});
  const [token, setToken] = useState('')
  const [messages, setMessages] = useState([])
  const [executing, setExecuting] = useState(true)
  const flatListRef = useRef(null);

  const getDashInfo = useCallback(async () => {
    try {


  const tokenData = await AsyncStorage.getItem('token')
  setToken(tokenData)
  const usernameTemp = await AsyncStorage.getItem('username');
  const userData = await getUser(tokenData, usernameTemp)
  console.log('user:', userData)
  setUser(userData)
  const messagesData = await getMessages(tokenData);
  setMessages(messagesData)
} catch (error) {
  console.error('Error fetching dashboard info:', error);
} finally {
  setExecuting(false);
}
}, [!messages]);

useFocusEffect(
  useCallback(() => {
    getDashInfo();

    const intervalId = setInterval(() => {
      if (token) {
        getMessages(token).then(setMessages).catch(console.error);
      }
    }, 300000); // Poll every 10 seconds

    return () => clearInterval(intervalId); // Clean up on unmount
  }, [getDashInfo, token])
);


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
        const result = await postMessage(token, message);
        console.log('Message posted:', result);
        // Optionally clear the input or update state/UI
        setInputText('');
        // Alert.alert('Success', 'Message posted successfully!');
    } catch (error) {
        console.error('Error submitting message:', error);
    }
};




const MessageList = ({ messages }) => {
  return (
    <FlatList
      data={messages}
      renderItem={({ item }) => (
        <View style={styles.messageItem}>
          <Text style={styles.userText}>{item.username}:</Text>
          <Text style={styles.messageText}>{item.text}</Text>
        </View>
      )}
      keyExtractor={(item) => item.id.toString()} // Use ID as key
    />
  );
};
if (executing){
  return (
    <View style={styles.container}>
      <Text style={styles.messageText}>Loading</Text>
    </View>
  )
}
return (
  <View style={styles.container}>
    <MessageList messages={messages} />
    <TextInput
      style={styles.input}
      value={inputText}
      onChangeText={setInputText}
      placeholder="Type your message"
    />
    <Button title="Send" color="#fe813b" onPress={handleSubmit} />
  </View>
);
};

const styles = StyleSheet.create({
  container: {
    // marginTop: 100,
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: '#ccc',

  },
  messageList: {
    height: height / 2,
    marginTop: 10,
  },
  messageItem: {
    flexDirection: 'row',
    padding: 10,
    borderBottomColor: '#fe813b',
    borderBottomWidth: 1,
    opacity: 4,
  },
  messageUser: {
    fontWeight: 'bold',
    color: ""
  },
  messageText: {
    // flex: 1,
    marginLeft: 10,
    marginRight: 40,
    textAlign: 'left', // Align text to the right
    color: "#fe813b",

  },
  userText: {
    // flex: 1,
    marginLeft: 5,
    marginRight: 10,
    // textAlign: 'right', // Align text to the right
    color: 'gray', // Use color instead of textColor
    fontWeight: 'bold',
  },

});

export default Board;
