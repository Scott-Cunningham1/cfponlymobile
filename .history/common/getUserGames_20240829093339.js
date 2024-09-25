const getUserGames = async (token, week, username) => {

    try {
        const fetchConfig = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache'
            },
        };
        const urlGames = `https://cfponly.com/api/various/games/${week}`
        const urlUser = `https://cfponly.com/api/users/${username}`
        const urlTeams = `https://cfponly.com/api/teams`
        console.log(url)

        const response = await fetch(urlGames, fetchConfig);
    
        if (response.ok) {
            console.log("fetching teams for week:", week)
            const gamesData = await response.json();

            

        const response = await fetch(urlGames, fetchConfig);
    
        if (response.ok) {
            console.log("fetching teams for week:", week)
            const gamesData = await response.json();

            
            const response = await fetch(urlGames, fetchConfig);
    
        if (response.ok) {
            console.log("fetching teams for week:", week)
            const gamesData = await response.json();

            return gamesData
        } else {
            console.error('Failed to fetch games:', response.statusText);
        }
    } catch (error) {
        console.error('Error fetching games:', error);
    }
   
};

export default getUserGames
