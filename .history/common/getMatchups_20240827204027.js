import getTeams from './getTeams'
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getMatchups = async (token) => {
    const tokenData = await AsyncStorage.getItem('token');
    const [teams, setTeams] = useState({});
    const [games, setGames] = useState({})

    try {
        const fetchConfig = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        };

        const gamesData = await fetch(`https://cfponly.com/api/various/games`, fetchConfig);
        console.log(response)
        if (response.ok) {
            const data = await response.json();
            const matchups = [];
            for (const matchup of data) {
                if (matchup.home_team in teams && matchup.away_team in teams) {
                    matchups.push(matchup)
                }
                return matchups
            }
        } else {
            console.error('Failed to fetch matchups:', response.statusText);
        }
    } catch (error) {
        console.error('Error fetching teams:', error);
    }
};

export default getMatchups
