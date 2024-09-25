import AsyncStorage from "@react-native-async-storage/async-storage";

const getUserGames = async (token, userTeams, games) => {
    

    const displayGames = gamesData.filter(game =>
        userTeams.includes(game.home_team) || userTeamsData.includes(game.away_team)
    );



    return displayGames;
};

export default getUserGames;
