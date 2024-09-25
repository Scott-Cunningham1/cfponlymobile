const getUserTeams = async (token, user_id, week) => {
    try {
        const fetchConfig = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        };
        const url = `https://cfponly.com/api/users/teams/${week}`

        console.log("week for userTeams")
        const response = await fetch(url, fetchConfig);
   
        if (response.ok) {
            const data = await response.json();
            console.log('url:', url)
            console.log(data)
            const userTeams = []
            for (const team in data){
                if (team.user_id === user_id)
                    userTeams.push(team)
            }
            console.log("userTeams:", userTeams)
            return userTeams
        } else {
            console.log('url:', url)
            console.error('Failed to fetch user teams:', response.statusText);
        }
    } catch (error) {
        console.error('Error fetching teams:', error);
    }
    
};

export default getUserTeams
