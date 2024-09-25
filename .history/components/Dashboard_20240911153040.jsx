import React, { useEffect, useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { ScrollView, View, Text, FlatList, StyleSheet, Image, Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import getLeaderboard from '../common/getLeaderboard';
import getSplit from '../common/getSplit';
import getImageSource from '../common/Images'
import getRankings from '../common/getRankings'
import getLines from '../common/getLines'
import getUserLines from '../common/getUserLines'


const { height, width } = Dimensions.get('window');

function ScoreDash() {

  const LoadingIndicator = () => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="#fe813b" />
      <Text>Loading...</Text>
    </View>
  );

  const [token, setToken] = useState("");
  const [username, setUsername] = useState('')
  const [user, setUser] = useState({});
  const [userGames, setUserGames] = useState([]);
  const [images, setImages] = useState({images})
  const [lines, setLines] = useState([]);
  const [userLines, setUserLines] = useState([]);
  const [games, setGames] = useState([])
  const [rankings, setRankings] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [split, setSplit] = useState();
  const [executing, setExecuting] = useState(true);
  const [time, setTime] = useState(new Date().toLocaleTimeString())
  const [week, setWeek] = useState(3)
  const navigation = useNavigation();

  const getDashInfo = useCallback(async () => {
    
    try{
      const tokenData = await AsyncStorage.getItem('token');
      setToken(tokenData);
      // console.log(time)

      const usernameData = await AsyncStorage.getItem('username');
      setUsername(usernameData)

      const userData = await AsyncStorage.getItem('user');
      const userDataObject = JSON.parse(userData)
      setUser(userDataObject);

      const linesData = await getLines(token, week)
      setLines(linesData)
      console.log("lines:", lines);
      console.log("user id:", user.id)
      console.log("week:", week)


      if (token, user.id, week){
      const userLinesData = await getUserLines(token, 1, 3);
      setUserLines(userLinesData)
      console.log("user lines:", userLines)}

      const rankingsData = await getRankings(token);
      setRankings(rankingsData);
      console.log("rankings:", rankings)

      const leaderboardData = await getLeaderboard(token);
      setLeaderboard(leaderboardData);
      console.log("leaderboard:", leaderboard)

      const splitData = await getSplit(token);
      setSplit(splitData);
      console.log("split", split)

  } catch (error) {
    console.error('Error fetching dashboard info:', error);
  } finally {
    console.log(split); // Set loading to false when done
  }
  }, [!rankings || !userLines]);

  useFocusEffect(
    useCallback(() => {
      getDashInfo();
    }, [getDashInfo])
  )

  useEffect(() => {
    // When userGames and other data are loaded, set executing to false
    if (leaderboard.length > 0 && rankings.length > 0, lines.length > 0, userLines.length > 0) {
      setExecuting(false);
    }
  }, [rankings, leaderboard, lines, userLines]);

  const handleCardPress = async (item) => {
    // Navigate to a detail screen or perform other actions
    console.log('Card pressed:', item);
    await AsyncStorage.setItem('userpage', item.username)

    navigation.navigate('Individual'); // Example navigation
   
  };
  
  
  const renderItem = ({ item, index }) => (
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

  );

  const AroundTheLeague = () => (
    <View style={[styles.littleTitlesCard]}>
      <Text style={styles.littleHeadersText}>Around the League</Text>
    </View>
  )

  const YourWeekAhead = () => (
    <View style={[styles.topLittleTitlesCard]}>
      <Text style={styles.littleHeadersText}>Your Week Ahead</Text>
    </View>
  )

  const CurrentLeaderboard = () => (
    <View style={[styles.littleTitlesCard3]}>
      <Text style={styles.littleHeadersText}>{split}</Text>
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

  const renderLeagueCard = ({ item }) => {
    // Fallback image if the team image is not found
    
  
    return (
      <View style={styles.leagueGamesCard}>
        <TouchableOpacity onPress={() => handleCardPress(item)} style={styles.horizontalCardContent}>
          <Text style={styles.horizontalCardText}><Image style={styles.image} source={getImageSource(item.home)} /> {item.home}</Text>
          <Text style={styles.horizontalCardText}><Image style={styles.image} source={getImageSource(item.away)} /> {item.away}</Text>
          <Text style={styles.horizontalCardDate}>{item.date}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderUserCard = ({ item }) => (
    <View style={styles.userGamesCard}>
      <TouchableOpacity onPress={() => handleCardPress(item)} style={styles.horizontalCardContent}>
        <Text style={styles.horizontalCardText}><Image style={styles.image} source={getImageSource(item.home)} /> {item.home}</Text>
        <Text style={styles.horizontalCardText}><Image style={styles.image} source={getImageSource(item.away)} /> {item.away}</Text>
        <Text style={styles.horizontalCardDate}>{item.date}</Text>
      </TouchableOpacity>
    </View>
  );

  

  
if (!executing) {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <CurrentLeaderboard />
      <MiddleCard />
      <FlatList
        data={leaderboard.sort((a, b) => a.rank - b.rank)} // Sort by rank
        renderItem={renderItem}
        keyExtractor={(item) => item.username} // Assuming username is unique
        contentContainerStyle={[styles.scrollContent, { paddingTop: 5 }]}
      />
      <YourWeekAhead />
      
      <FlatList
        data={userLines.slice(0, 5)} // Display a subset for horizontal scroll, adjust as needed
        renderItem={renderLeagueCard}
        keyExtractor={(item) => item.home} // Assuming each game has a unique id
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalScrollContent}
      />
      <AroundTheLeague />
      <FlatList
        data={lines.slice(0, 30)} // Display a subset for horizontal scroll, adjust as needed
        renderItem={renderUserCard}
        keyExtractor={(item) => item.home} // Assuming each game has a unique id
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalScrollContent}
      />
      


    </ScrollView>
  );
}
else {

    return <LoadingIndicator />;

}

}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    // justifyContent: 'top',
    backgroundColor: '#fe813b',
  },
  topCard: {
    height: height / 10,
    backgroundColor: 'white',
    width: '100%',
    // borderRadius: 10,
    // margin: 10,
    paddingTop: 40,
    padding: 10,
    // justifyContent: 'center',
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
  littleHeadersCard: {
    height: height / 16,
    backgroundColor: '#FFFFFF',
    padding: 10,
    margin: 10,
    marginBottom: 10,
    justifyContent: 'left',
    alignItems: '',
    elevation: 5,
    shadowColor: '#cc5500',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    borderRadius: 10,
  },
  middleCard: {
    height: height / 16,
    backgroundColor: '#FFFFFF',
    padding: 10,
    margin: 10,
    marginBottom: 10,
    // justifyContent: 'center',
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
    color: '#ffffff',
    textAlign: 'left',
    flex: 1,

  },
  middleCardTextPlayer: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'left',
    flex: 2,
    paddingLeft: 15,
  },
  middleCardTextTotal: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'right',
    flex: 2,
    paddingLeft: 10,
  },
  middleCardTextLosses: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'right',
    flex: 2,
  },
  middleCardTextPoints: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'right',
    flex: 2,
  },
  card: {
    height: height / 14,
    backgroundColor: '#ffffff',
    borderRadius: 0,
    borderWidth: 1,
    borderColor: "#FFC000",
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    padding: 20,
    // justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#cc5500',
    shadowOffset: { width: 2, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    borderRadius: 10,
    opacity: .6,
  },
  titlesCard: {
    height: height / 24,
    backgroundColor: '#fe813b',
    // borderRadius: 0,
    // marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    // marginTop: 50,
    padding: 10,
    // justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    // shadowColor: '#cc5500',
    // shadowOffset: { width: 2, height: 8 },
    // shadowOpacity: 0.2,
    // shadowRadius: 3,
    // borderRadius: 10,
    opacity: .9,
  },
  topLittleTitlesCard: {
    height: height / 24,
    backgroundColor: '#fe813b',
    // borderRadius: 0,
    // marginBottom: 10,
    // marginLeft: 10,
    marginRight: 10,
    marginTop: 50,

    paddingTop: 10,
    paddingBttom: 10,
    // justifyContent: 'center',
    alignItems: 'center',
    // elevation: 5,
    // shadowColor: '#cc5500',
    // shadowOffset: { width: 2, height: 8 },
    // shadowOpacity: 0.2,
    // shadowRadius: 3,
    // borderRadius: 10,
    opacity: .9,
  },
  littleTitlesCard: {
    height: height / 24,
    backgroundColor: '#fe813b',
    // borderRadius: 0,
    // marginBottom: 10,
    // marginLeft: 10,
    marginRight: 10,
    marginTop: 0,

    paddingTop: 10,
    paddingBttom: 10,
    // justifyContent: 'center',
    alignItems: 'center',
    // elevation: 5,
    // shadowColor: '#cc5500',
    // shadowOffset: { width: 2, height: 8 },
    // shadowOpacity: 0.2,
    // shadowRadius: 3,
    // borderRadius: 10,
    opacity: .9,
  },
  littleTitlesCard3: {
    height: height / 16,
    backgroundColor: '#fe813b',
    // borderRadius: 0,
    // marginBottom: 10,
    // marginLeft: 10,
    marginRight: 10,
    marginTop: 0,

    paddingTop: 10,
    // paddingBttom: 10,
    // justifyContent: 'center',
    alignItems: 'center',
    // elevation: 5,
    // shadowColor: '#cc5500',
    // shadowOffset: { width: 2, height: 8 },
    // shadowOpacity: 0.2,
    // shadowRadius: 3,
    // borderRadius: 10,
    opacity: .9,
  },
  cardContent: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    // justifyContent: 'center',
  },
  cardRow: {
    flexDirection: 'row',
    width: '100%',
  },
  columnRank: {
    fontSize: 15,
    color: 'black',
    textAlign: 'left',
    flex: 1,
  },
  columnPlayer: {
    fontSize: 15,
    color: 'black',
    textAlign: 'left',
    flex: 2,
    paddingLeft: 6,
  },
  columnTotal: {
    fontSize: 15,
    color: 'black',
    textAlign: 'right',
    flex: 2,

  },
  columnLosses: {
    fontSize: 15,
    color: 'black',
    textAlign: 'right',
    flex: 2,
  },
  columnPoints: {
    fontSize: 15,
    color: 'black',
    textAlign: 'right',
    flex: 2,
  },
  loadingContainer: {
    flex: 1,
    // justifyContent: 'center',
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
  userGamesCard: {
    width: 250, // Adjust width as needed
    height: height / 6, // Adjust height as needed
    backgroundColor: '#ffffff',
    borderRadius: 20,
    margin: 10,
    padding: 10,
    // justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: 4 },
    // shadowOpacity: 0.9,
    shadowRadius: 6,
    borderWidth: 2,
    borderColor: '#fe813b',
    opacity: .6
  },
  leagueGamesCard: {
    width: 250, // Adjust width as needed
    height: height / 6, // Adjust height as needed
    backgroundColor: '#ffffff',
    borderRadius: 20,
    margin: 10,
    padding: 10,
    // justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: 4 },
    // shadowOpacity: 0.9,
    shadowRadius: 6,
    borderWidth: 2,
    borderColor: '#fe813b',
    opacity: .6
  },
  horizontalCardContent: {
    flex: 1,
    // justifyContent: 'center',
  },
  horizontalCardText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
  },
  horizontalCardDate: {
    fontSize: 14,
    color: '#777',
  },
  horizontalScrollContent: {
    paddingHorizontal: 10,
  },
  scrollContent: {
    paddingBottom: 20, // Ensures content is not cut off
  },
  littleHeadersText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'right',
    flex: 2,
    paddingLeft: 10,
  },
  image: {
    width: 20,
    height: 20
  },
  testImage: {
    width: 80,
    height:80
  }

});

export default ScoreDash;
