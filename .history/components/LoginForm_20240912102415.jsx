import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import loginUser from '../common/loginUser';
import getUser from '../common/getUser'


const LoginForm = () => {
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
            const userData = await getUser(userToken, usernameApi);
            setUser(userData)
            console.log(user)
            await AsyncStorage.setItem('token', userToken);
            await AsyncStorage.setItem('username', usernameApi);
            await AsyncStorage.setItem('user', JSON.stringify(userData))
            const check = await AsyncStorage.getItem('username')
            const check2 = await AsyncStorage.getItem('user')
            console.log("user:", check2)
            if (usernameApi === check) {
              console.log('going')
              console.log(check)
              console.log(usernameApi)
              setUsernameApi('');
              setPassword('');
            navigation.navigate('Dashboard');
            }
    };}

    return (
    
        

        <View style={styles.logoContainer}>
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
      backgroundColor: '#fe813b',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20, // Optional padding
  },
  inputContainer: {
      width: '100%',
      maxWidth: 400, // Optional max width for better layout on large screens
      alignItems: 'center',
  },
  inputHeader: {
      marginBottom: 20,
  },
  inputHeaderText: {
      fontSize: 20,
      color: 'white',
      textAlign: 'center',
  },
  textInput: {
      width: '100%',
      maxWidth: 300,
      height: 40,
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
      marginBottom: 20,
      borderRadius: 8,
      borderColor: 'white',
      borderWidth: 2,
      alignItems: "center",
      justifyContent: "center",
  },
  buttonText: {
      color: "white",
      fontWeight: "bold",
      fontSize: 16,
  },
  errorText: {
      color: 'red',
      marginBottom: 20,
  },
  signupText: {
      color: 'white',
      marginTop: 10,
  },
  signupLink: {
      textDecorationLine: 'underline',
  },
});
