const getScoreboard = async (token, week) => {
    try {
        const fetchConfig = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(`https://cfponly.com/api/games/scoreboard/${week}`, fetchConfig);
        if (response.ok) {
            const data = await response.json();
            console.log()
            return data;
        } else {
            console.error('Failed to fetch scoreboard:', response.statusText);
        }
    } catch (error) {
        console.error('Error fetching scoreboard:', error);
    }
};


export default getScoreboard
