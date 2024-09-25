import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import loginUser from '../common/loginUser';
import getTeams from '../common/getTeams';
import getLeaderboard from '../common/getLeaderboard';
import getUser from '../common/getUser'
import checkToken from '../common/checkToken'

const LoginForm = () => {
    const [usernameApi, setUsernameApi] = useState('');
    const [password, setPassword] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [teams, setTeams] = useState([]);
    const [leaderboard, setLeaderboard] = useState([]);
    const [user, setUser] = useState({});
    const [token, setToken] = useState(null);
    const navigation = useNavigation();
  
    useEffect(() => {
      const check = async () => {
        const storedToken = await AsyncStorage.getItem('token');
        if (storedToken !== null) {
          console.log('there was a token:', storedToken)
          navigation.navigate('Dashboard');
        }
      }
      check();
    }, []);

    console.log(usernameApi, password);
    // for development this lets me know the user actions are being read by the development environment.

    const handleSubmit = async () => {

      const userToken = await loginUser(usernameApi, password);
          if (!userToken) {
              setPassword('');
              setUsernameApi('');
              setSubmitted(true);
              console.log('Sorry, login failed');
          } else {
              console.log('Token received from login:', userToken);
            // await new Promise(resolve => setTimeout(resolve, 300)); 
            await AsyncStorage.setItem('token', userToken);
            await AsyncStorage.setItem('username', usernameApi);
            const check = await AsyncStorage.getItem('username')
            if (check === usernameApi) {
              console.log('going')
              console.log(check)
              console.log(usernameApi)
              setUsernameApi('');
              setPassword('');
            navigation.navigate('Dashboard');
            }
    };}

    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Image source={require('../assets/Logo.png')} style={styles.logo} />
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Username"
                    value={usernameApi}
                    onChangeText={setUsernameApi}
                    style={styles.textInput}
                />
                <TextInput
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    style={styles.textInput}
                />
                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
                {submitted && <Text style={styles.errorText}>Incorrect Login Credentials. Please Try Again.</Text>}
                <TouchableOpacity onPress={() => navigation.navigate('SignUpForm')}>
                    <Text style={styles.signupText}>Don't have an account? <Text style={styles.signupLink}>Signup</Text></Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    logoContainer: {
        flex: 1,
        backgroundColor: '#fe813b',
        justifyContent: 'flex-end', // Align contents to the bottom of the logo container
        alignItems: 'center',
        paddingBottom: 20, // Add some padding if needed
    },
    logo: {
        width: 200, // Adjust based on your logo size
        height: 100, // Adjust based on your logo size
    },
    inputContainer: {
        flex: 1,
        justifyContent: 'center', // Center contents vertically
        alignItems: 'center',
        backgroundColor: '#ffffff',
        paddingHorizontal: 20,
    },
    textInput: {
        width: '100%',
        maxHeight: 40,
        minHeight: 40,
        backgroundColor: 'white',
        paddingHorizontal: 10,
        marginBottom: 20,
        borderRadius: 8,
        textAlign: 'center',
    },
    button: {
        height: 40,
        backgroundColor: "#fe8a4a",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        borderColor: 'white',
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    buttonText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 16,
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
    },
    signupText: {
        color: 'black',
        marginTop: 10,
    },
    signupLink: {
        textDecorationLine: 'underline',
    },
});

export default LoginForm;
