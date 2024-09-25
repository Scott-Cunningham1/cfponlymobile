const getUserTeams = async (token, user_id) => {
    try {
        const fetchConfig = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(`https://cfponly.com/api/users/${user_id}/teams`, fetchConfig);
   
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            console.
            console.error('Failed to fetch user teams:', response.statusText);
        }
    } catch (error) {
        console.error('Error fetching teams:', error);
    }
};

export default getUserTeams
