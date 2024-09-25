import React, { useEffect, useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { ScrollView, View, Text, FlatList, StyleSheet, ImageBackground, Image, Dimensions, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import getLeaderboard from '../common/getLeaderboard';
import getUser from '../common/getUser';
import getSplit from '../common/getSplit';
import getTeams from '../common/getTeams';
import getGames from '../common/getGames';
import Logo from '../assets/Logo.png'

// import { LinearGradient } from 'react-native-linear-gradient';
import { LinearGradient } from 'expo-linear-gradient';

const { height, width } = Dimensions.get('window');
const cardColors = ['#f8f9fa', '#e9ecef', '#dee2e6', '#ced4da', '#adb5bd']

function ScoreDash() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [user, setUser] = useState({});
  const [split, setSplit] = useState();
  const navigation = useNavigation();
  const [games, setGames] = useState([]);
  const [teams, setTeams] = useState([]);
  const [userGames, setUserGames] = useState([]);
  const [criteriaMet, setCriteriaMet] = useState(false);

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
        setUser(userData);
        const teamsData = await getTeams(tokenData);
        setTeams(teamsData);
        const gamesData = await getGames(tokenData);
        setGames(gamesData);
        
        const leaderboardData = await getLeaderboard(tokenData);
        setLeaderboard(leaderboardData);
        const splitData = await getSplit(tokenData)
        setSplit(splitData * 5 + 350)
        
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
  )


  const handleCardPress = async (item) => {
    // Navigate to a detail screen or perform other actions
    console.log('Card pressed:', item);
    await AsyncStorage.setItem('userpage', item.username)

    navigation.navigate('Individual'); // Example navigation
   
  };
  
  
  const renderItem = ({ item, index }) => (
    <ScrollView
      >
    <TouchableOpacity onPress={() => handleCardPress(item)} style={[styles.card]}>
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
    </ScrollView>
  );

const TopCard = () => (

    <View style={[styles.topCard]}>
      <Image
      source={Logo}  // Replace with your image URL or local path
      style={styles.topCardImage}
    />

      <Text style={styles.additional}>{Number((split * 0.7).toFixed(2))} / {Number((split * 0.3).toFixed(2))}</Text>
    </View>
  )

  const MiddleCard = () => (
    <View style={[styles.titlesCard]}>
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
    <View style={styles.container}>
      <MiddleCard />
      <FlatList
        data={leaderboard.sort((a, b) => a.rank - b.rank)} // Sort by rank
        renderItem={renderItem}
        keyExtractor={(item) => item.username} // Assuming username is unique
        contentContainerStyle={[styles.scrollContent, { paddingTop: 5 }]}
      />
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'top',
    backgroundColor: 'white',
  },
  topCard: {
    height: height / 10,
    backgroundColor: 'white',
    width: '100%',
    // borderRadius: 10,
    // margin: 10,
    paddingTop: 40,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    zIndex: 1,

    borderColor: 'black',
    borderWidth: 4,


  },
  topCardText: {
    fontSize: 60,
    fontWeight: 'bold',
    color: 'white',
    textShadowColor: "red",
  },
  topCardImage: {
    height: 150,
    width: 350,

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
    color: '#f3813b',
    textAlign: 'left',
    flex: 1,

  },
  middleCardTextPlayer: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#f3813b',
    textAlign: 'left',
    flex: 2,
    paddingLeft: 15,
  },
  middleCardTextTotal: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#f3813b',
    textAlign: 'right',
    flex: 2,
    paddingLeft: 10,
  },
  middleCardTextLosses: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#f3813b',
    textAlign: 'right',
    flex: 2,
  },
  middleCardTextPoints: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#f3813b',
    textAlign: 'right',
    flex: 2,
  },
  card: {
    height: height / 12,
    backgroundColor: '#fe813b',
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
    opacity: .9,
  },
  titlesCard: {
    height: height / 24,
    backgroundColor: 'white',
    // borderRadius: 0,
    // marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 50,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#cc5500',
    shadowOffset: { width: 2, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    // borderRadius: 10,
    opacity: .9,
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
  scrollContent: {
    flexGrow: 1,
  },
  underline: {
    position: 'absolute',
    bottom: -1, // Adjust this value to increase or decrease the space between text and underline
    width: '100%',
    borderBottomWidth: 2, // Thickness of the underline
    borderBottomColor: 'black', // Color of the underline
  },
});

export default ScoreDash;
