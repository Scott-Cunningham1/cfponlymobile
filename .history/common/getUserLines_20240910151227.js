

const getUserGames = async (userTeams, ) => {
    
    const userTeamsNames = []
    for (const team of userTeams) {
        userTeamsNames.push(team.name)
    }
    const displayGames = []
    for (const line of games) {
        if (userTeamsNames.includes(game.home_team) || userTeamsNames.includes(game.away_team)) {
            displayGames.push(game)
        }
    }
    console.log('user games:', displayGames)



    return displayGames;
};

export default getUserGames;