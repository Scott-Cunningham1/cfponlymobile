const getUserTeams = async (token, user_id) => {
    try {
        const fetchConfig = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        };
        const urlTeam = `https://cfponly.com/api/users/${user_id}/teams`
        const urlRecord = `https://cfponly.com/api/records`


        const responseTeam = await fetch(urlTeam, fetchConfig);
   
        if (responseTeam.ok) {
            const dataTeam = await response.json();
            console.log('url:', url)
            console.log(data)
        } else {
            console.log('url:', url)
            console.error('Failed to fetch user teams:', response.statusText);
        }
        if (responseRecord.ok){
            const dataRecord = await responseRecord.json()
        }
    } catch (error) {
        console.error('Error fetching teams:', error);
    }
    
};

export default getUserTeams
