import getMatchups from '../common/getMatchups'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text } from 'react-native'
import { useEffect, useState } from 'react'

function Matchups() {
    const [matchups, setMatchups] = useState([]);

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
    const getAnswer = useCallback(async () => {

    const tokenData = await AsyncStorage.getItem('token');

    const data = getMatchups(tokenData)
    console.log(data)
    }, [])
    useFocusEffect(
        useCallback(() => {
          getAnswer();
        }, [getAnswer])
      )
    return (
        <View>
            <Text>Hi</Text>
        </View>

    )
}
export default Matchups
