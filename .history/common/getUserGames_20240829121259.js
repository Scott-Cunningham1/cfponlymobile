const getUserGames = async (token, week, username) => {
    const [games, setGames] = useState([]);
    const [teams, userTeams] = useState([]);
    const [user, getUser] = useState([]);

    const 

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

        const responseGames = await fetch(urlGames, fetchConfig);
    
        if (responseGames.ok) {
            console.log("fetching games for week:", week)
            const gamesData = await responseGames.json();
        }

        const responseUser = await fetch(urlUser, fetchConfig);
    
        if (responseUser.ok) {
            console.log("fetching user for week:", week)
            const userData = await responseUser.json();
        }

        const responseTeams = await fetch(urlTeams, fetchConfig);
    
        if (responseTeams.ok) {
            console.log("fetching teams for week:", week)
            const teamsData = await responseTeams.json();

            
        } else {
            console.error('Failed to fetch games:', response.statusText);
        }
    } catch (error) {
        console.error('Error fetching games:', error);
    }
   
};

export default getUserGames
