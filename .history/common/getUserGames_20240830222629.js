import { useState } from "react";

const getUserGames = async (userTeams, games) => {
    
    const [userTeamsNames, setUserTeamsNames] = useState([]);
    for (const team of userTeams) {
        userTeamsNames.push(team.name)
    }
    const displayGames = []
    for (const game of games) {
        
    }



    return displayGames;
};

export default getUserGames;
