import React, { useEffect, useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { Linking, View, Text, FlatList, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import getUser from '../common/getUser';
import getTeams from '../common/getTeams';
import { useNavigation } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient';

const { height } = Dimensions.get('window');

function Board() {
  const [user, setUser] = useState({});
  const [teams, setTeams] = useState([]);
  const navigation = useNavigation();


    const getInfo = useCallback( async () => {
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

        const teamsWithUsernames = getTeams(token)
        .filter(team => team.user_id !== 0)
        .map(team => {
          const userd = userData.find(user => user.id === team.user_id);
          return { ...team, username: user ? user.username : 'Unknown' };
        });

      setTeams(teamsWithUsernames);


      } catch (error) {
        console.error('Error retrieving data:', error);
      }
    }, [navigation]);
    useFocusEffect(
      useCallback(() => {
        getInfo();
      }, [getInfo])
    )

  



  const renderItem = ({ item }) => (

      <View style={styles.cardContent}>
        <View style={styles.cardRow}>
          <Text style={styles.columnRank}>{item.user_id}</Text>
          <Text style={styles.columnTeam}>{item.name}</Text>
          <Text style={styles.columnWins}>{item.rank}</Text>
        </View>
      </View>
  
  );

  const TopCard = () => (
    <View style={[styles.topCard, {backgroundColor: 'rgba(255, 255, 255, 0)'}]}>
      <Text style={styles.topCardText}>Draft Board</Text>
    </View>
  );

  const MiddleCard = () => (
    <View style={[styles.middleCard, {backgroundColor: 'rgba(255, 255, 255, 0)'}]}>
      <View style={styles.middleCardRow}>
        <Text style={styles.middleCardTextRank}>Player</Text>
        <Text style={styles.middleCardTextTeam}>Team</Text>
        <Text style={styles.middleCardTextTotal}>Rank</Text>
      </View>
    </View>
  );


  return (
    <LinearGradient
    colors={['#00ffc7', '#000000']} // Define your gradient colors
    style={styles.container}
  >
    <FlatList
      ListHeaderComponent={<><TopCard /><MiddleCard /></>} // Add the top card component
      data={teams.sort((a, b) => a.user_id - b.user.id)} // Sort by rank
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()} // Assuming id is unique
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
    backgroundColor: '#cc5500',
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
    fontSize: 40,
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
  middleCardTextTeam: {
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
  columnTeam: {
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
  columnWins: {
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

export default Board;
