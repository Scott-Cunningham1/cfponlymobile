import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage (adjust the import based on your environment)

const logout = async () => {
    try {
        const url = `http://192.168.1.45:8000/token`;

        // Retrieve the userToken from AsyncStorage
        const userToken = await AsyncStorage.getItem('token');
        if (!userToken) {
            console.warn('No user token found in async storage');
            return;
        }

        const response = await fetch(url, {
            method: "POST",
            credentials: "include",
            headers: {
                "Authorization": `Bearer ${userToken}`
            }
        });

        if (response.ok) {
            console.log('Logout successful');
            // Clear the userToken from AsyncStorage
            await AsyncStorage.removeItem('token');
            // Optionally clear other user data from AsyncStorage
        } else {
            console.error('Logout failed:', response.status, response.statusText);
            // Handle specific errors if needed
            // For example:
            // throw new Error('Failed to logout');
        }
    } catch (error) {
        console.error('Error in logoutUser:', error);
        // Propagate the error further or handle as needed
        // throw error; // Uncomment to propagate the error
    }
};

export default logout
