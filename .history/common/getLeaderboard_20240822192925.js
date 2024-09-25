    const getLeaderboard = async (token) => {
    try {
        const fetchConfig = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(`http://my-fastapi-env.eba-bgixmkqg.us-east-1.elasticbeanstalk.com//api/users`, fetchConfig);
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


export default getLeaderboard
