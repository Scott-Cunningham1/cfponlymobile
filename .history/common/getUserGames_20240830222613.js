import { useState } from "react";

const getUserGames = async (userTeams, games) => {
    
    const [userTeamsNames, setUserTeamsNames] = useState([]);
    for (const team of userTeams) {
        userTeamsNames.push(team.name)
    }
    const displayGames = []
    for ()



    return displayGames;
};

export default getUserGames;
