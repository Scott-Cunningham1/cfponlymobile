    const getTeams = async (token) => {
    try {
        const fetchConfig = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(`http://192.168.1.45:8000/api/teams`, fetchConfig);
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
