import getMatchups from '../common/getMatchups'
import { useEffect, useState } from 'react'

function Matchups() {
    const [matchups, setMatchups] = useState([]);

    const data = await getMatchups()
}
export default Matchups
