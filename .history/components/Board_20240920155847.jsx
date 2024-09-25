import React, { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, TextInput, Button, FlatList, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import postMessage from '../common/postMessage';
import getUser from '../common/getUser';
import getMessages from '../common/getMessages';
import AsyncStorage from '@react-native-async-storage/async-storage';




function Board() {

  const [inputText, setInputText] = useState('');
  const [user, setUser] = useState({});
  const [token, setToken] = useState('')
  const [messages, setMessages] = useState([])
  const [executing, setExecuting] = useState(true)

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
  }, [getDashInfo])
);


useEffect(() => {
  const ws = new WebSocket('ws://cfponly.com/ws/messages');
  
  ws.onmessage = (event) => {
    const newMessage = JSON.parse(event.data);
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  setSocket(ws);

  return () => {
    ws.close(); // Clean up on unmount
  };
}, []);

const handleSubmit = async () => {
  if (!inputText.trim()) {
    Alert.alert('Error', 'Message cannot be empty.');
    return;
  }

  const newMessage = {
    user_id: 1, // Replace with actual user ID
    text: inputText,
    created_at: new Date().toISOString(),
  };

  // Send message to the backend (consider broadcasting here too)
  socket.send(JSON.stringify(newMessage));
  setInputText(''); // Clear input
};




const MessageList = ({ messages }) => {
  return (
    <FlatList
      data={messages}
      renderItem={({ item }) => (
        <View style={styles.messageItem}>
          <Text style={styles.username}>{item.username}:</Text>
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
    <Button title="Send" onPress={handleSubmit} />
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
    color: ""
  },
  messageText: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'right',
    alignItems: 'right'
  },

});

export default Board;
