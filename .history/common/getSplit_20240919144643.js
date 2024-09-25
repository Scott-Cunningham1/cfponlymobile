import { Ionicons } from '@expo/vector-icons';
import { Text } from 'react-native'

const getSplit = async (token, week) => {
    try {
        const fetchConfig = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(`https://cfponly.com/api/leaderboard/${week}`, fetchConfig);
        if (response.ok) {
            const data = await response.json();
            const losses = 0
            for (const loss in data){
                losses += loss.losses
            }
            const splitUp = .7 * (losses * 5 + 350)
            const splitDown = .3 * (losses * 5 + 350)
            console.log("losses:", losses)
            return <Text><Ionicons name="skull" size={15} />{splitUp} / <Ionicons name="skull" size={15} />{splitDown}</Text>
        } else {
            console.error('Failed to fetch user:', response.statusText);
        }
    } catch (error) {
        console.error('Error fetching user:', error);
    }
};


export default getSplit
