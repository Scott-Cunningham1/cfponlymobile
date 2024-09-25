import getTeams from './getTeams'
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getMatchups = async (token) => {
    const tokenData = await AsyncStorage.getItem('token');
    const [teams, setTeams] = useState({});
    const teamsData = await getTeams(tokenData)
    setTeams(teamsData)

    try {
        const fetchConfig = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(`https://cfponly.com/api/various/games`, fetchConfig);
        console.log(response)
        if (response.ok) {
            const data = await response.json();
            for (const matchups in data) {
                if data[].home_team in teams && data.
            }
        } else {
            console.error('Failed to fetch matchups:', response.statusText);
        }
    } catch (error) {
        console.error('Error fetching teams:', error);
    }
};

export default getMatchups
