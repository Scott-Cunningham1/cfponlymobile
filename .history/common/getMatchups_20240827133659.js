import getTeams from './common/getTeams'
import { useState } from 'react';

const [teams, setTeams] = useState([])

const apiKey = 'oBTy/c0j6sKdyUV+y04qgYeEqRtXJKV9RBjj2s2/FCIWfn5jEfln4lPEt98J+OZo';
const getMatchups = async (token, apiKey, week) => {
    

    try {
        const fetchConfig = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(`https://cfponly.com/api/various/matchups`, fetchConfig);
        console.log(response)
        if (response.ok) {
            const data = await response.json();
            console.log(data)
        } else {
            console.error('Failed to fetch teams:', response.statusText);
        }
    } catch (error) {
        console.error('Error fetching teams:', error);
    }
};

export default getMatchups
