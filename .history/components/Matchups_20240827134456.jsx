import getMatchups from '../common/getMatchups'
import { useEffect, useState } from 'react'

function Matchups() {
    const [matchups, setMatchups] = useState([]);
    const tokenData = AsyncStorage.getItem('token');

    const data = getMatchups(tokenData)
    console.log(data)
    return (
        <View>
            <Text>Hi</Text>
        </View>

    )
}
export default Matchups
