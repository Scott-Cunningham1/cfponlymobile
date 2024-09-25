import getMatchups from '../common/getMatchups'
import { useEffect, useState } from 'react'

function Matchups() {
    const [matchups, setMatchups] = useState([]);

    const data = getMatchups(token)
    console.log(data)
    return 
}
export default Matchups
