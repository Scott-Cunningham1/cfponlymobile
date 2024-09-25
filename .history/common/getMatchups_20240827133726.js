import getTeams from './common/getTeams'
import { useState } from 'react';

const [teams, setTeams] = useState([])


const getMatchups = async (token) => {
    

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
            return data
        } else {
            console.error('Failed to fetch teams:', response.statusText);
        }
    } catch (error) {
        console.error('Error fetching teams:', error);
    }
};

export default getMatchups
