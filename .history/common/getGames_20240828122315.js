
import AsyncStorage from '@react-native-async-storage/async-storage';

const getGames = async (token, week) => {

    try {
        const fetchConfig = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        };
        const url = `https://cfponly.com/api/various/games/${week}`
        console.log(url)

        const response = await fetch(url, fetchConfig);
    
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

export default getGames
