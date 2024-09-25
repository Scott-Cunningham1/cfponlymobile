import { Ionicons } from '@expo/vector-icons';
import 

const getSplit = async (token) => {
    try {
        const fetchConfig = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(`https://cfponly.com/api/teams/losses`, fetchConfig);
        if (response.ok) {
            const data = await response.json();
            const splitUp = .7 * (data * 5 + 350)
            const splitDown = .3 * (data * 5 + 350)
            return <Ionicons name="american-football-outline" color={color} size={15} />${splitUp} / ${splitDown};
        } else {
            console.error('Failed to fetch user:', response.statusText);
        }
    } catch (error) {
        console.error('Error fetching user:', error);
    }
};


export default getSplit
