const getUserTeams = async (token, user_id) => {
    try {
        const fetchConfig = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        };
        const url = `https://cfponly.com/api/users/${user_id}/teams`


        const response = await fetch(url, fetchConfig);
   
        if (response.ok) {
            const data = await response.json();
            console.log('url:', url)
            console.log(data)
            const userTeams = []
            for (team in data){
                if team.user_
            }
        } else {
            console.log('url:', url)
            console.error('Failed to fetch user teams:', response.statusText);
        }
    } catch (error) {
        console.error('Error fetching teams:', error);
    }
    
};

export default getUserTeams
