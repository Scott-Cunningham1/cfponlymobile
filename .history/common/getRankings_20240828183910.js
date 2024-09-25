const getRankings = async (token) => {
    try {
        const fetchConfig = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(`https://cfponly.com/api/various/rankings/1`, fetchConfig);
   
        if (response.ok) {
            const data = await response.json();
            console.log(data)
            return data;
        } else {
            console.error('Failed to fetch teams:', response.statusText);
        }
    } catch (error) {
        console.error('Error fetching teams:', error);
    }
};

export default getRankings
