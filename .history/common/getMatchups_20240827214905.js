import getTeams from './getTeams'
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getMatchups = async (token) => {
    const tokenData = await AsyncStorage.getItem('token');
    const [teams, setTeams] = useState([]);
    const [games, setGames] = useState([]);

    try {
        const fetchConfig = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(`https://cfponly.com/api/various/games`, fetchConfig;
        console.log(gamesResponse)
        if (gamesResponse.ok) {
            const gamesData = await gamesResponse.json();
            setGames(gamesData)
        } else {
            console.error('Failed to fetch games:', response.statusText);
        }
    } catch (error) {
        console.error('Error fetching games:', error);
    }
   
};

export default getMatchups
