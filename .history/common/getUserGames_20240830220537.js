import AsyncStorage from "@react-native-async-storage/async-storage";

const getUserGames = async (token, user) => {
    // Define variables to hold fetched data
    let gamesData = [];
    let userData = {};
    let teamsData = [];

    try {
        const fetchConfig = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache'
            },
        };

        const urlGames = `https://cfponly.com/api/various/games/1`;
        const urlUser = `https://cfponly.com/api/users/${username}`;
        const urlTeams = `https://cfponly.com/api/teams`;


        console.log(urlGames, urlUser, urlTeams);

        const [responseGames, responseUser, responseTeams] = await Promise.all([
            fetch(urlGames, fetchConfig),
            fetch(urlUser, fetchConfig),
            fetch(urlTeams, fetchConfig),
        ]);

        if (responseGames.ok) {
            gamesData = await responseGames.json();
        } else {
            console.error('Failed to fetch games:', responseGames.statusText);
        }

        if (responseUser.ok) {
            userData = await responseUser.json();
        } else {
            console.error('Failed to fetch user:', responseUser.statusText);
        }

        if (responseTeams.ok) {
            teamsData = await responseTeams.json();
        } else {
            console.error('Failed to fetch teams:', responseTeams.statusText);
        }

    } catch (error) {
        console.error('Error fetching data:', error);
    }

   

    
    const userTeamsData = teamsData
        .filter(team => team.user_id === userData.id)
        .map(team => team.name);

    const displayGames = gamesData.filter(game =>
        userTeamsData.includes(game.home_team) || userTeamsData.includes(game.away_team)
    );



    return displayGames;
};

export default getUserGames;
