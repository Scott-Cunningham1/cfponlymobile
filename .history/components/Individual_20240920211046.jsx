import React, { useEffect, useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { Linking, Image, View, Text, FlatList, StyleSheet, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import getUser from '../common/getUser';
import getUserTeams from '../common/getUserTeams';
import getUserLines from '../common/getUserLines';
import getImageSource from '../common/Images';
import getWeek from '../common/getWeek'
import { useNavigation } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient';

const { height } = Dimensions.get('window');

function Individual() {
  const [user, setUser] = useState({});
  const [userTeams, setUserTeams] = useState([]);
  const [userLines, setUserLines] = useState([]);
  const [executing, setExecuting] = useState(true);
  const [time, setTime] = useState(new Date().toISOString())
  const [week, setWeek] = useState(3)
  const navigation = useNavigation();


    const getInfo = useCallback(async () => {
      try {
        const tokenData = await AsyncStorage.getItem('token');
        const usernameTemp = await AsyncStorage.getItem('userpage');

        if (!tokenData) {
          console.log('No token found, navigating to Login');
          navigation.navigate('LoginForm');
          return;
        }

        const userData = await getUser(tokenData, usernameTemp);
        setUser(userData);
        console.log("user:", user)
        const weekData = await getWeek(time)
        setWeek(weekData)

        if (tokenData && week) {
        const userTeamsData = await getUserTeams(tokenData, userData.id, week);
        setUserTeams(userTeamsData);
        console.log("userTeams:", userTeamsData)
        console.log("week:", week)

        const userLinesData = await getUserLines(tokenData, userData.id, week);
        setUserLines(userLinesData);
        console.log("userLines:", userLinesData)
        }

      } catch (error) {
        console.error('Error retrieving data:', error);
      }
    }, [!userLines || userLines.length < 1]);
    useFocusEffect(
      useCallback(() => {
        getInfo();
      }, [getInfo])
    )
    useEffect(() => {
      // When userGames and other data are loaded, set executing to false
      if (user.length > 0 && userTeams.length > 0, userLines.length > 0) {
        setExecuting(false);
      }
    }, [user, userTeams, userLines]);
  


  const handleCardPress = (item) => {
    console.log('Card pressed:', item);
    Linking.openURL(`https://www.espn.com/college-football/team/schedule/_/id/${item.web_id}`);
  };

  const renderItem = ({ item, index }) => (
    <TouchableOpacity onPress={() => handleCardPress(item)} style={styles.card}>
      <View style={styles.cardContent}>
        <View style={styles.cardRow}>
          <Text style={styles.columnRank}>{item.rank}</Text>
          <Text style={styles.columnTeam}>{item.name}</Text>
          <Text style={styles.columnWins}>{item.wins}</Text>
          <Text style={styles.columnLosses}>{item.losses}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const UsernameCard = () => (
    <View style={styles.usernameCard}>
      <Text style={styles.usernameCardText}>{user.username || 'User'}</Text>
    </View>
  );

  const DataTitlesCard = () => (
    <View style={styles.dataTitlesCard}>
      <View style={styles.dataTitlesCardRow}>
        <Text style={styles.dataTitlesCardTextRank}>Rank</Text>
        <Text style={styles.dataTitlesCardTextTeam}>Team</Text>
        <Text style={styles.dataTitlesCardTextTotal}>Wins</Text>
        <Text style={styles.dataTitlesCardTextLosses}>Losses</Text>
      </View>
    </View>
  );
  
  const UserGamesThisWeek = () => (
    <View style={[styles.littleTitlesCard]}>
      <Text style={styles.littleHeadersText}>{user.username}'s games this week</Text>
    </View>
  )
  const renderUserCard = ({ item }) => {
    const backgroundColor = item.home_user && item.away_user ? '#000000' : '#ffffff'; // Example condition
    const textColor = item.home_user && item.away_user ? '#fe813b' : '#000000'
    return (
    <View style={[styles.leagueGamesCard, { backgroundColor }]}>
      <TouchableOpacity onPress={() => handleCardPress(item)} style={styles.horizontalCardContent}>
        <View style={styles.leftColumn}>
          <Text style={[styles.leftColumnText, { color: textColor }]}>{item.away_user || "Open"}</Text>
          <Image style={styles.image} source={getImageSource(item.away)} />
          <Text style={[styles.horizontalCardText, { color: textColor }]}>{item.away}</Text>
        </View>
  
        <View style={styles.middleColumn}>
          <Text style={[styles.horizontalCardDate, { color: textColor }]}>{item.date}</Text>
        </View>
  
        <View style={styles.rightColumn}>
          <Text style={[styles.horizontalCardText, { color: textColor }]}>{item.home_user || "Open"}</Text>
          <Image style={styles.image} source={getImageSource(item.home)} />
          <Text style={[styles.horizontalCardText, { color: textColor }]}>{item.home}</Text>
        </View>
      </TouchableOpacity>
    </View>
    )
  
  );

if(!executing){
  return (
    <ScrollView style={styles.container}>


  
    <FlatList
      ListHeaderComponent={<><UsernameCard /><DataTitlesCard /></>} // Add the top card component
      data={userTeams.sort((a, b) => a.rank - b.rank)} // Sort by rank
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()} // Assuming id is unique
      contentContainerStyle={styles.container}
    />
    <UserGamesThisWeek />

    <FlatList
        data={userLines.slice(0, 5)} // Display a subset for horizontal scroll, adjust as needed
        renderItem={renderUserCard}
        keyExtractor={(item) => item.home} // Assuming each game has a unique id
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalScrollContent}
    />

  </ScrollView>
  );
}
}

const styles = StyleSheet.create({
  container: {
    // height: height / 1,
   

    // justifyContent: 'top',
    backgroundColor: '#fe813b',
  },
  usernameCard: {
    height: height / 6,
    backgroundColor: '#fe813b',
    margin: 10,
    paddingTop: 50,
    marginBottom: -10,
   
    alignItems: 'center',
    justifyContent: 'center',
  },
  usernameCardText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    textShadowColor: "red",
  },
  dataTitlesCard: {
    height: height / 24,
    backgroundColor: '#fe813b',
    padding: 10,
    paddingTop: 0,
    paddingBottom: -10,
    margin: 10,
    marginBottom: 10,
    marginTop: -20,
    justifyContent: 'center',
  },
  dataTitlesCardRow: {
    flexDirection: 'row',
    width: '100%',
  },
  dataTitlesCardTextRank: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'left',
    flex: 1,
  },
  dataTitlesCardTextTeam: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'left',
    flex: 2,
    paddingLeft: 15,
  },
  dataTitlesCardTextTotal: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'right',
    flex: 2,
    paddingLeft: 10,
  },
  dataTitlesCardTextLosses: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'right',
    flex: 2,
  },
  dataTitlesCardTextPoints: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'right',
    flex: 2,
  },
  card: {
    height: height / 12,
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
    color: '#000000',
    textAlign: 'left',
    flex: 1,
  },
  columnTeam: {
    fontSize: 15,
    color: '#000000',
    textAlign: 'left',
    flex: 2,
    paddingLeft: 6,
  },
  columnTotal: {
    fontSize: 15,
    color: '#000000',
    textAlign: 'right',
    flex: 2,
  },
  columnWins: {
    fontSize: 15,
    color: '#000000',
    textAlign: 'right',
    flex: 2,
  },
  columnLosses: {
    fontSize: 15,
    color: '#000000',
    textAlign: 'right',
    flex: 2,
  },
  columnPoints: {
    fontSize: 15,
    color: '#000000',
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
  image: {
    width: 20,
    height: 20
  },
  littleTitlesCard: {
    height: height / 24,
    backgroundColor: '#fe813b',
    // borderRadius: 0,
    // marginBottom: 10,
    // marginLeft: 10,
    marginRight: 10,
    marginTop: 0,

    paddingTop: 0,
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
  littleHeadersText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'right',
    flex: 2,
    paddingLeft: 10,
  },
  leagueGamesCard: {
    height: height / 8,
    width: 350,
    margin: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
    elevation: 3, // For Android shadow
    shadowColor: '#000', // For iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    justifyContent: 'center',
    // opacity: .6,
  },

});

export default Individual;