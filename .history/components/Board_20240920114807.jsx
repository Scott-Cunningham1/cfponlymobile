import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet, TouchableOpacity } from 'react-native';

const MessageBoard = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [userName, setUserName] = useState('');

  const addMessage = () => {
    if (inputText.trim() && userName.trim()) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: Date.now().toString(), text: inputText.trim(), user: userName.trim() },
      ]);
      setInputText('');
    }
  };

  const deleteMessage = (id) => {
    setMessages((prevMessages) => prevMessages.filter((msg) => msg.id !== id));
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

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={userName}
        onChangeText={setUserName}
        placeholder="Your Name"
      />
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

export default MessageBoard;
