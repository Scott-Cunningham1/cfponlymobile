import AsyncStorage from "@react-native-async-storage/async-storage";

const getUserGames = async (userTeams, games) => {
    
    const
    const displayGames = games.filter(game =>
        userTeams.includes(game.home_team) || userTeams.includes(game.away_team)
    );



    return displayGames;
};

export default getUserGames;
