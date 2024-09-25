import getTeams from './common'

const getMatchups = async (token) => {
    

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
            return data
        } else {
            console.error('Failed to fetch matchups:', response.statusText);
        }
    } catch (error) {
        console.error('Error fetching teams:', error);
    }
};

export default getMatchups
