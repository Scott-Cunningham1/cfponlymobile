import React, { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, FlatList, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import getLeaderboard from '../common/getLeaderboard';
import getMatchups from '../common/getMatchups'
import getTeams from '../common/getTeams'
import { LinearGradient } from 'expo-linear-gradient';

const { height, width } = Dimensions.get('window');
const cardColors = ['#f8f9fa', '#e9ecef', '#dee2e6', '#ced4da', '#adb5bd']

function Matchups() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [teams, setTeams] = useState([]);
  const [games, setGames] = useState([]);
  const [matchups, setMatchups] = useState([]);
  const navigation = useNavigation();


    const getMatchupInfo = useCallback(async () => {
      try {
        const tokenData = await AsyncStorage.getItem('token');
                console.log('Fetching token...');
        const leaderboardData = await getLeaderboard(tokenData);
        setLeaderboard(leaderboardData);
        const teamsData = await getTeams(tokenData);
        setTeams(teamsData);
        const gamesData = await getMatchups(tokenData);
        setGames(gamesData)
        console.log("teams:", teams)
        const matches = []
        for (const game of games) {
          if (game.home_team in teams && game.away_team in teams) {
            matches.push(game)
          }
        }
        setMatchups(matches)
 
        

}
       catch (error) {
        console.error('Error retrieving data', 'hi', error);
      } finally {
        console.log('finished');

      }
    }, [])

  useFocusEffect(
    useCallback(() => {
      getMatchupInfo();
    }, [getMatchupInfo])
  )


  const handleCardPress = async (item) => {
    // Navigate to a detail screen or perform other actions
    console.log('Card pressed:', item);
    await AsyncStorage.setItem('userpage', item.username)

    navigation.navigate('Individual'); // Example navigation
   
  };
  
  
  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleCardPress(item)} style={styles.card}>
        <View style={styles.cardContent}>
            <Text style={styles.homeTeamText}>Home: {item.home_team}</Text>
            <Text style={styles.awayTeamText}>Away: {item.away_team}</Text>
        </View>
    </TouchableOpacity>
);
const TopCard = () => (

    <View style={[styles.topCard, {backgroundColor: 'rgba(255, 255, 255, 0)'}]}>
      <Text style={styles.topCardText}>Big Games</Text>

    </View>
  )



  return (
    <View>
      <Text
    </View>
    // <LinearGradient
    //   colors={['#00ffc7', '#000000']} // Define your gradient colors
    //   style={styles.gradientContainer}
    // >
    // <FlatList
    //   ListHeaderComponent={<><TopCard /></>} // Add the top card component
    //   data={matchups.sort((a, b) => a.home_team - b.home_team)} // Sort by rank
    //   renderItem={renderItem}
    //   keyExtractor={(item) => item.home_team} // Assuming username is unique
    //   contentContainerStyle={styles.container}
    // />
    // </LinearGradient>
  );

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
    backgroundColor: 'white',
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
    color: '#000',
    textAlign: 'center',
  },
  awayTeamText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
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
