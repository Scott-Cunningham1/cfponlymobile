import React, { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, FlatList, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import getLeaderboard from '../common/getLeaderboard';
import getGames from '../common/getGames'
import getTeams from '../common/getTeams'
import { ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { height, width } = Dimensions.get('window');
const cardColors = ['#f8f9fa', '#e9ecef', '#dee2e6', '#ced4da', '#adb5bd']

function Matchups() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [teams, setTeams] = useState([]);
  const [games, setGames] = useState([]);
  const [matchups, setMatchups] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();


    const getMatchupInfo = useCallback(async () => {
      try {
        const tokenData = await AsyncStorage.getItem('token');
                console.log('Fetching token...');
        const week = await AsyncStorage.getItem('matchup_week');
        const gamesData = await getGames(tokenData, week);
        setGames(gamesData)
  

if (games) {
  setLoading(false)
}

        

}
       catch (error) {
        console.error('Error retrieving data', 'hi', error);
      } finally {
        console.log('finished');

      }
    }, [matchups === null])

    useFocusEffect(
      useCallback(() => {
        getMatchupInfo();
      }, [getMatchupInfo])
    )
  
if (loading) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#00f0ff" />
      <Text style={styles.text}>Loading...</Text>
    </View>
  );
}
else{
  return (
    <View style={styles.container}>
      <View style={styles.listContainer}>
        {data.map((item, index) => (
          <View key={index} style={styles.item}>
            <Text style={styles.itemText}>{item.home_team} vs {item.away_team}</Text>
          </View>
        ))}
      </View>
    </View>
  );



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    marginTop: 50, // Margin applied to the top of the list
  },
  item: {
    padding: 15,
    marginBottom: 10, // Space between individual items
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2, // for Android shadow
  },
  itemText: {
    fontSize: 18,
    fontWeight: 'bold',
  }
});}


export default Matchups;
