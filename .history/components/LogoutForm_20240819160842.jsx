
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import logoutUser from '../common/out'


const LogoutForm = () => {
    const [token, setToken] = useState('');
    const navigation = useNavigation();

    useEffect(() => {
        setToken(AsyncStorage.getItem('token'));
            if (token) {
                console.log('tokentoken)
            }
    }, []);

    const handleSubmit= async () => {
        logoutUser()
        navigation.navigate('LoginForm');
    
    }

    //     if (token) {
    //         await AsyncStorage.clear();
    //         const keys = await AsyncStorage.getAllKeys();
    //         if (keys.length === 0) {
    //         navigation.navigate('LoginForm');
    //         console.log('keys', keys);
    //         }
    //     }
    //     else {
    //         console.log("you didn't have a token")
    //     }
    // }
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
        </View>
    )
}

export default LogoutForm

const styles = StyleSheet.create({
logoContainer: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // paddingTop: '10%',
    // paddingBottom: '10%',
    // paddingHorizontal: 10,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
   
    flexDirection: "col",
    justifyContent: "space-around",
    marginTop: 20,
    alignItems: 'center',
    CanvasGradient: 80
  },
  button: {
    height: 90,
    // backgroundColor: "#c76802", // Adjust color as needed
    padding: 10,
    marginBottom: 5,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: 'black',
    width: 398,
    opacity: 30
  },
  buttonText: {
    color: "black",
    fontWeight: "bold",
    justifyContent: "center",
    fontSize: 20,
  },
  Logo:{
    height: 280,
    width: 500
  },
  image: {
width: 500,
height: 1000
  }
});
