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
   
  
  
  
  const renderItem = ({ item }) => (

        <View style={styles.card}>
            <Text style={styles.homeTeamText}>{item.home_team}</Text>
            <Text style={styles.awayTeamText}>Away: {item.away_team}</Text>
        </View>

);


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
    // <View style={styles.container}>
    //   <Text style={styles.text}>Test</Text>
    // </View>

    <FlatList

      data={games.sort((a, b) => a.home_team - b.home_team)} // Sort by rank
      renderItem={renderItem}
      keyExtractor={(item) => item.home_team} // Assuming username is unique
      contentContainerStyle={styles.container}
    />
  
  );}
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'top',
  },
  topCard: {
    height: height / 6,
    borderRadius: 10,
    margin: 10,
    paddingTop: 60,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  topCardText: {
    fontSize: 60,
    fontWeight: 'bold',
    color: 'white',
    textShadowColor: "red",
  },
  middleCard: {
    height: height / 16,
    backgroundColor: '#FFFFFF',
    padding: 10,
    margin: 10,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'flex-start',
    elevation: 5,
    shadowColor: '#cc5500',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    borderRadius: 10,
  },
  card: {
    height: height / 10,
    backgroundColor: '#fe813b',
    borderRadius: 10,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#cc5500',
    shadowOffset: { width: 2, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  cardContent: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  homeTeamText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
  },
  awayTeamText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  loadingText: {
    fontSize: 24,
    color: 'black',
  },
});

export default Matchups;
