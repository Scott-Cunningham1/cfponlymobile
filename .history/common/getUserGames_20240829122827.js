import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from 'react';

const getUserGames = async (token, username) => {
    // const [games, setGames] = useState([]);
    // const [teams, setTeams] = useState([]);
    // const [user, setUser] = useState([]);

    try {
        const fetchConfig = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache'
            },
        };
        const urlGames = `https://cfponly.com/api/various/games/1`
        const urlUser = `https://cfponly.com/api/users/${username}`
        const urlTeams = `https://cfponly.com/api/teams`
        console.log(url)

        const responseGames = await fetch(urlGames, fetchConfig);
    
        if (responseGames.ok) {
            // console.log("fetching games for week:", week)
            const gamesData = await responseGames.json();
            // setGames(gamesData)
        }

        const responseUser = await fetch(urlUser, fetchConfig);
    
        if (responseUser.ok) {
            // console.log("fetching user for week:", week)
            const userData = await responseUser.json();
            // setUser(userData)
        }

        const responseTeams = await fetch(urlTeams, fetchConfig);
    
        if (responseTeams.ok) {
            // console.log("fetching teams for week:", week)
            const teamsData = await responseTeams.json();
            setTeams(teamsData)

            
        } else {
            console.error('Failed to fetch games:', response.statusText);
        }
    } catch (error) {
        console.error('Error fetching games:', error);
    }
    const userTeamsData = []
    for (const team of teams) {
        if (team.user_id === user.id) {
          userTeamsData.push(team.name)
        }
      };
    const displayGames = []
    for (const game of games) {
        if (game.home_team in teams || game.away_team in teams) {
            displayGames.push(game)
        }
    }
    return displayGames

};

export default getUserGames
