import AsyncStorage from "@react-native-async-storage/async-storage";


const checkToken = async () => {

    const storedToken = await AsyncStorage.getItem('token');
    if (storedToken && storedToken !== null) {

        console.log(storedToken);
        return storedToken
        // This serves to send the user directly to their dashboard if they already have a non-null token in AsyncStorage.
    } else {
        console.log('No token');
        // For development, this shows that the checkToken() function is working and the user has not yet logegd in.
        }
};

export default checkToken
