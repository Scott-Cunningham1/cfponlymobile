import getTeams from './common/getTeams'

const getMatchups = async (token, apiKey, week) => {
    try {
        const fetchConfig = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(`https://cfponly.com/api/teams`, fetchConfig);
        console.log(response)
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            console.error('Failed to fetch teams:', response.statusText);
        }
    } catch (error) {
        console.error('Error fetching teams:', error);
    }
};

export default getTeams
