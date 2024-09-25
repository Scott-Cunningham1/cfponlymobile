import getMatchups from '../common/getMatchups'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text } from 'react-native'
import { useEffect, useState } from 'react'

function Matchups() {
    const [matchups, setMatchups] = useState([]);
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