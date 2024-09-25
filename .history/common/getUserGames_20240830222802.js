import { useState } from "react";

const getUserGames = async (userTeams, games) => {
    
    const [userTeamsNames, setUserTeamsNames] = useState([]);
    for (const team of userTeams) {
        userTeamsNames.push(team.name)
    }
    const displayGames = []
    for (const game of games) {
        if (userTeamsNames.includes(game.home_team) || userTeamsNames.includes(game.away_team)) {
            displayGames.push(game)
        }
    }



    return displayGames;
};

export default getUserGames;
