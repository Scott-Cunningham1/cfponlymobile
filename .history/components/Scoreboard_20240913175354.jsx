import React, { useEffect, useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { Linking, Image, View, Text, FlatList, StyleSheet, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import getUser from '../common/getUser';
import getImageSource from '../common/Images'
import getScoreboard from '../common/getScoreboard'
import { useNavigation } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient';

const { height, width } = Dimensions.get('window');

function Scoreboard() {
  const [user, setUser] = useState({});
  const [scoreboard, setScoreboard] = useState([]);
  const [week, setWeek] = useState(3);
  const [executing, setExecuting] = useState(true);
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


        const scoreboardData = await getScoreboard(tokenData, week);
        setScoreboard(scoreboardData);
        console.log("Scoreboard:", scoreboardData)
        console.log("week:", week)
   

      } catch (error) {
        console.error('Error retrieving data:', error);
      }
    }, [!scoreboard]);
    useFocusEffect(
      useCallback(() => {
        getInfo();
      }, [getInfo])
    )
    useEffect(() => {
      // When userGames and other data are loaded, set executing to false
      if (scoreboard.length > 0) {
        setExecuting(false);
      }
    }, [user, scoreboard]);
  








  
  
  const Title = () => (
    <View style={[styles.littleTitlesCard]}>
      <Text style={styles.littleHeadersText}>Scoreboard</Text>
    </View>
  )
  const ScoreboardCard = ({ item }) => (
    <View style={styles.userGamesCard}>
      <TouchableOpacity onPress={() => handleCardPress(item)} style={styles.horizontalCardContent}>
      <View style={styles.teamContainer}>
        <View style={styles.leftSection}>
          <Text style={styles.teamText}><Image style={styles.image} source={getImageSource(item.home_team)} />{item.home_team}      {item.home_points}</Text>
          <Text style={styles.teamText}><Image style={styles.image} source={getImageSource(item.away_team)} />{item.away_team}      </Text>
        </View>
        <View style={styles.rightSection}>
          <Text style={styles.pointsText}>{item.home_points !== null ? item.home_points : 'N/A'}</Text>
          <Text style={styles.pointsText}>{item.away_points !== null ? item.away_points : 'N/A'}</Text>
        </View>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>{item.quarter || 'N/A'} | {item.time || 'N/A'} | {item.down || 'N/A'} | {item.possession || 'N/A'}</Text>
      </View>
        
      </TouchableOpacity>
    </View>
  );
if(!executing){
  return (
    <ScrollView style={styles.container}>
      <Title />


  
    <FlatList
      // ListHeaderComponent={<><Title /></>} // Add the top card component
      data={scoreboard.sort((a, b) => a.home_team - b.home_team)} // Sort by rank
      renderItem={ScoreboardCard}
      keyExtractor={(item) => item.home_team} // Assuming id is unique
      // numColumns={2}
      contentContainerStyle={styles.container}
    />
    

  </ScrollView>
  );
}
}

const styles = StyleSheet.create({
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
  container: {
    // height: height / 1,
    // justifyContent: 'top',
    backgroundColor: '#fe813b',
  },
userGamesCard: {
    height: height / 8,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    margin: 10,
    padding: 10,
    flexDirection: 'row', // Add this
    alignItems: 'center', // Ensure items are centered vertically
    elevation: 5,
    borderWidth: 2,
    borderColor: '#fe813b',
    opacity: .6,
  },
  horizontalCardContent: {
    flexDirection: 'row', // Ensure horizontal layout
    width: '100%', // Full width
  },
  teamContainer: {
    flexDirection: 'row', // Align items horizontally
    justifyContent: 'space-between', // Space between sections
    flex: 1,
  },
  leftSection: {
    flexDirection: 'column',
    flex: 1, // Takes up remaining space
  },
  rightSection: {
    flexDirection: 'column',
    alignItems: 'flex-end', // Align points to the right
    flex: 1, // Ensure it takes up space and aligns to the right
  },
  teamText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 5,
  },
  pointsText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 5,
  },
  image: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  infoContainer: {
    marginTop: 10,
  },
  infoText: {
    fontSize: 14,
    color: '#777',
  },

  littleTitlesCard: {
    height: height / 24,
    backgroundColor: '#fe813b',
    // borderRadius: 0,
    // marginBottom: 10,
    // marginLeft: 10,
    marginRight: 10,
    marginTop: 90,
    paddingTop: 0,
    paddingBttom: 0,
    alignItems: 'center',
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


});

export default Scoreboard;
