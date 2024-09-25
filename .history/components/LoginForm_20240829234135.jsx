import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import loginUser from '../common/loginUser';
import getTeams from '../common/getTeams';
import getLeaderboard from '../common/getLeaderboard';
import getUser from '../common/getUser'
import checkToken from '../common/checkToken'

const LoginForm = async () => {
    const [usernameApi, setUsernameApi] = useState('');
    const [password, setPassword] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [teams, setTeams] = useState([]);
    const [leaderboard, setLeaderboard] = useState([]);
    const [user, setUser] = useState({});
    const [token, setToken] = useState(null);
    const navigation = useNavigation();
  
    // useEffect(() => {
    //   const check = async () => {
    //     const storedToken = await AsyncStorage.getItem('token');
    //     const user = await AsyncStorage.getItem('username');
    //     if (storedToken !== null) {
    //       console.log('there was a token:', storedToken)
    //       console.log('user:', user)

    //       navigation.navigate('Dashboard');
        
    //     }
    //   }
    //   check();
    // }, []);

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
            const userData = await getUser(usernameApi);
            setUser(userData)
            console.log(user)
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
            else{

            }
    };}

    return (
    
        

        <View style={styles.logoContainer}>
        {/* <Image source={require('../assets/Logo.png')} style={styles.Logo}/> */}
        <View style={styles.inputHeader}>
        <Text style={styles.inputHeaderText}>Please Login to Continue</Text>
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
                {submitted && <Text style={{ color: 'red' }}>Incorrect Login Credentials. Please Try Again.</Text>}
                <TouchableOpacity onPress={() => navigation.navigate('SignUpForm')}>
                    <Text style={{ color: 'white', marginTop: 10 }}>Don't have an account?&nbsp; 
                    <Text style={{ textDecorationLine: 'underline' }}>Signup</Text>
                    </Text>
                </TouchableOpacity>
            </View>
            </View>
            
 
    );
};

export default LoginForm;

const styles = StyleSheet.create({
logoContainer: {
    flex: 1,
    justifyContent: 'bottom',
    backgroundColor: '#fe813b',
    alignItems: 'center',
    // paddingTop: '10%',
    // paddingBottom: '10%',
    // paddingHorizontal: 10,
  },
  container: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'orange',
  },
  inputHeader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    justifyItems: 'center',
    marginTop: 40,
    marginBottom: 10,

    fontSize: 20,
    width: 300,
    maxHeight: 40,
    minHeight: 40,
    color: 'white',
  },
  inputHeaderText: {
    fontSize: 20,
    color: 'white',

  },
  inputContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: '',
    justifyItems: 'center',

  },
  buttonContainer: {
    flexDirection: "col",
    justifyContent: "space-around",
    marginTop: 20,
    alignItems: 'center',
    CanvasGradient: 80
  },
  button: {
    height: 40, // Adjusted height to match text inputs
    backgroundColor: "#fe8a4a", // Adjust color as needed
    paddingVertical: 10, // Adjusted padding
    paddingHorizontal: 20, // Adjusted padding
    marginBottom: 20, // Adjusted margin to match text inputs
    borderRadius: 8,
    borderColor: 'white',
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: 'white',
    width: 160, // Adjusted width to match text inputs
    opacity: 20,
},
  buttonText: {
    color: "white",
    fontWeight: "bold",
    justifyContent: "center",
    fontSize: 12,
  },
  Logo:{
    height: 280,
    width: 500
  },
  image: {
width: 500,
height: 1000
  },
textInput: {
    width: 300,
    maxHeight: 40,
    minHeight: 40,
    backgroundColor: 'white',
    padding: 5,
    marginBottom: 20,
    // flex: 1,
    borderRadius: 8,
    textAlign: 'center',


  }
});