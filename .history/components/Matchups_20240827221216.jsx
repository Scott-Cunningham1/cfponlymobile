import React, { useEffect, useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, FlatList, StyleSheet, ImageBackground, Image, Dimensions, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import getLeaderboard from '../common/getLeaderboard';
import getUser from '../common/getUser';
import getSplit from '../common/getSplit';
import getMatchups from '../common/getMatchups'
// import { LinearGradient } from 'react-native-linear-gradient';
import { LinearGradient } from 'expo-linear-gradient';

const { height, width } = Dimensions.get('window');
const cardColors = ['#f8f9fa', '#e9ecef', '#dee2e6', '#ced4da', '#adb5bd']

function Matchups() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [teams, setTeams] = useState([]);
  const [games, setGames] = useState([]);
  const [matchups, setMatchups] = useState([]);
  const navigation = useNavigation();
  const [criteriaMet, setCriteriaMet] = useState(false);

    const getDashInfo = useCallback(async () => {
      try {
        const tokenData = await AsyncStorage.getItem('token');
                console.log('Fetching token...');
        const leaderboardData = await getLeaderboard(tokenData);
        setLeaderboard(leaderboardData);
        const gamesData = await getMatchups(tokenData);
        setGames(gamesData)
        const matches = []
        for (const game of games) {
          if (game.home_team in teams && game.away_team in teams) {
            matches.push(game)
          }
          
        setMatchups(matches)
        

}}
       catch (error) {
        console.error('Error retrieving data', 'hi', error);
      } finally {
        console.log('finished');

      }
    }, [])

  useFocusEffect(
    useCallback(() => {
      getDashInfo();
    }, [getDashInfo])
  )


  const handleCardPress = async (item) => {
    // Navigate to a detail screen or perform other actions
    console.log('Card pressed:', item);
    await AsyncStorage.setItem('userpage', item.username)

    navigation.navigate('Individual'); // Example navigation
   
  };
  
  
  const renderItem = ({ item, index }) => (
    <TouchableOpacity onPress={() => handleCardPress(item)} style={[styles.card, {backgroundColor: 'rgba(255, 255, 255, 0.2)'}]}>
      <View style={styles.cardContent}>
        <View style={styles.cardRow}>
          <Text style={styles.columnRank}>{index + 1}</Text>
          <Text style={styles.columnPlayer}>{item.username}</Text>
          <Text style={styles.columnTotal}>{item.rank}</Text>
          <Text style={styles.columnLosses}>{item.losses}</Text>
          <Text style={styles.columnPoints}>{item.points}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

const TopCard = () => (

    <View style={[styles.topCard, {backgroundColor: 'rgba(255, 255, 255, 0)'}]}>
      <Text style={styles.topCardText}>Hi {user.username  || 'User'} !</Text>
      <Text style={styles.additional}>{Number((split * 0.7).toFixed(2))} / {Number((split * 0.3).toFixed(2))}</Text>
    </View>
  )

  const MiddleCard = () => (
    <View style={[styles.middleCard, {backgroundColor: 'rgba(255, 255, 255, 0.2)'}]}>
        <View style={styles.middleCardRow}>
          <Text style={styles.middleCardTextRank}>Rank</Text>
          <Text style={styles.middleCardTextPlayer}>Player</Text>
          <Text style={styles.middleCardTextTotal}>Total</Text>
          <Text style={styles.middleCardTextLosses}>Losses</Text>
          <Text style={styles.middleCardTextPoints}>Points</Text>
        </View>
      </View>
  )

  return (
    <LinearGradient
      colors={['#00ffc7', '#000000']} // Define your gradient colors
      style={styles.gradientContainer}
    >
    <FlatList
      ListHeaderComponent={<><TopCard /><MiddleCard /></>} // Add the top card component
      data={leaderboard.sort((a, b) => a.rank - b.rank)} // Sort by rank
      renderItem={renderItem}
      keyExtractor={(item) => item.username} // Assuming username is unique
      contentContainerStyle={styles.container}
    />
    </LinearGradient>
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
  middleCardRow: {
    flexDirection: 'row',
    width: '100%',
  },
  middleCardTextRank: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'left',
    flex: 1,
  },
  middleCardTextPlayer: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'left',
    flex: 2,
    paddingLeft: 15,
  },
  middleCardTextTotal: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'right',
    flex: 2,
    paddingLeft: 10,
  },
  middleCardTextLosses: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'right',
    flex: 2,
  },
  middleCardTextPoints: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'right',
    flex: 2,
  },
  card: {
    height: height / 10,
    backgroundColor: 'white',
    borderRadius: 0,
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
    borderRadius: 10,
  },
  cardContent: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardRow: {
    flexDirection: 'row',
    width: '100%',
  },
  columnRank: {
    fontSize: 15,
    color: 'white',
    textAlign: 'left',
    flex: 1,
  },
  columnPlayer: {
    fontSize: 15,
    color: 'white',
    textAlign: 'left',
    flex: 2,
    paddingLeft: 6,
  },
  columnTotal: {
    fontSize: 15,
    color: 'white',
    textAlign: 'right',
    flex: 2,

  },
  columnLosses: {
    fontSize: 15,
    color: 'white',
    textAlign: 'right',
    flex: 2,
  },
  columnPoints: {
    fontSize: 15,
    color: 'white',
    textAlign: 'right',
    flex: 2,
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
