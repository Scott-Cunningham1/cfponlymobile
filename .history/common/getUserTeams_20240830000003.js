const getUserTeams = async (token, 1) => {
    try {
        const fetchConfig = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(`https://cfponly.com/api/users/${id}/teams`, fetchConfig);
   
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            console.error('Failed to fetch user teams:', response.statusText);
        }
    } catch (error) {
        console.error('Error fetching teams:', error);
    }
};

export default getUserTeams
