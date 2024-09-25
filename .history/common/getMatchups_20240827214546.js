import getTeams from './getTeams'
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getMatchups = async (token) => {
    const tokenData = await AsyncStorage.getItem('token');
    const [teams, setTeams] = useState([]);
    const [games, setGames] = useState([]);

    try {
        const fetchConfigGames = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        };

        const gamesResponse = await fetch(`https://cfponly.com/api/various/games`, fetchConfigGames);
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
    try {
        const fetchConfigTeams = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        };

        const teamsResponse = await fetch(`https://cfponly.com/api/teams`, fetchConfigTeams);
        console.log(teamsResponse)
        if (teamsResponse.ok) {
            const teamsData = await gamesResponse.json();
            setTeams(teamsData)
        } else {
            console.error('Failed to fetch teams:', response.statusText);
        }
    } catch (error) {
        console.error('Error fetching teams:', error);
    }

};

export default getMatchups



