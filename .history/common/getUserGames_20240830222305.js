import AsyncStorage from "@react-native-async-storage/async-storage";

const getUserGames = async (userTeams, games) => {
    
    const userTeamsNames = [];
    for (const team of userTeams) {
        userTeamsNames.push(team.name)
    }
    const displayGames = games.filter(game =>
        userTeamsNames.includes(game.home_team) || userTeamsNames.includes(game.away_team)
    );



    return displayGames;
};

export default getUserGames;
