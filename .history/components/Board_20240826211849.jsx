import React, { useEffect, useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { TextInput, View, Text, FlatList, StyleSheet, Button, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import getUser from '../common/getUser';
import getTeams from '../common/getTeams';
import { useNavigation } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient';

const Board = () => {
    const [username, setUsername] = useState('');
    const [message, setMessage] = useState('');
    const [name, setName] = useState('')
    const [messages, setMessages] = useState([]);
  

    const getDashInfo = useCallback(async () => {
        try {
          const tokenData = await AsyncStorage.getItem('token');
                  console.log('Fetching token...');
          const usernameTemp = await AsyncStorage.getItem('username')
          if (!tokenData) {
            navigation.navigate('Test');
            console.log('no token');
          }
          const userData = await getUser(tokenData, usernameTemp);
          setUser(userData.username);
          const leaderboardData = await getLeaderboard(tokenData);
          setLeaderboard(leaderboardData);
          if (user.username === usernameTemp) {
            setCriteriaMet(true);
  }
        } catch (error) {
          console.error('Error retrieving data', 'hi', error);
        } finally {
          console.log('finished');
  
        }
      }, [])
  
    useFocusEffect(
      useCallback(() => {
        getDashInfo();
      }, [getDashInfo])
    );

    const handlePostMessage = () => {
      if (username && message) {
        setMessages([...messages, { id: Math.random().toString(), username, message }]);
        setUsername('');
        setMessage('');
      }
    };
  
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Simple Message Board</Text>
        <TextInput
          style={styles.input}
          placeholder="Your name"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Your message"
          value={message}
          onChangeText={setMessage}
        />
        <Button title="Post Message" onPress={handlePostMessage} />
        <FlatList
          data={messages}
          renderItem={({ item }) => (
            <View style={styles.message}>
              <Text>{item.username}: {item.message}</Text>
            </View>
          )}
          keyExtractor={item => item.id}
          style={styles.messageBoard}
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
    header: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    input: {
      height: 40,
      borderColor: '#ddd',
      borderWidth: 1,
      marginBottom: 10,
      paddingHorizontal: 8,
    },
    messageBoard: {
      marginTop: 20,
    },
    message: {
      borderBottomColor: '#ddd',
      borderBottomWidth: 1,
      paddingVertical: 10,
    },
  });
  
  export default Board;