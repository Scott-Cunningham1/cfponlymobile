import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native'; 

const logoutUser = async () => {
    try {
        const url = `https://cfponly.c/token`; // Update this endpoint if needed

        // Retrieve the userToken from AsyncStorage
        const userToken = await AsyncStorage.getItem('token');
        console.log(userToken);
        if (!userToken) {
            console.warn('No user token found in async storage');
            return;
        }

        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${userToken}`, // Send the token in the Authorization header
                "Content-Type": "application/json", // Adjust if your API requires a different content type
            },
            // Optionally, you might need to send a body with additional info for some APIs
        });

        if (response.ok) {
            console.log('Logout successful');
            // Clear the userToken from AsyncStorage
            await AsyncStorage.removeItem('token');
            await AsyncStorage.removeItem('username');
            const work = await AsyncStorage.getItem('token')
            console.log(work)
    
        } else {
            console.error('Logout failed:', response.status, response.statusText);
            // Optionally handle specific errors or response details
            const responseBody = await response.text();
            console.error('Response Body:', responseBody);
        }
    } catch (error) {
        console.error('Error in logoutUser:', error);
        // Propagate the error further or handle as needed
        // throw error; // Uncomment to propagate the error
    }
};

export default logoutUser;
