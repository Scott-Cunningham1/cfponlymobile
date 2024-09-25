    const getLeaderboard = async (token, week) => {
    try {
        const fetchConfig = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(`https://cfponly.com/api/leaderboard/${week}`, fetchConfig);
        if (response.ok) {
            const data = await response.json();
            console.log('week:', week)
            
            return data;
        } else {
            console.error('Failed to fetch teams:', response.statusText);
        }
    } catch (error) {
        console.error('Error fetching teams:', error);
    }
};


export default getLeaderboard
