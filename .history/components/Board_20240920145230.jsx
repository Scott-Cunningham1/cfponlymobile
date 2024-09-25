import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet, TouchableOpacity } from 'react-native';
import postMessage from '../common/postMessage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Board = async () => {
  const [message, setMessage] = useState('');
  const [inputText, setInputText] = useState('');
  const [userName, setUserName] = useState('');

  const usernameTemp = await AsyncStorage.get()



  const addMessage = () => {
    if (inputText.trim()) {
      setMessage(inputText);
      setInputText('');
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
    console.log("Messages updated:", messages);
  }, [messages]);
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={inputText}
        onChangeText={setInputText}
        placeholder="Type your message"
      />
      <Button title="Add Message" onPress={addMessage} />
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        style={styles.messageList}
      />
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
