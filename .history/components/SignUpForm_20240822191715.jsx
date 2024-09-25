import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useAuthContext } from '@galvanize-inc/jwtdown-for-react'; // Assuming this is compatible with React Native
import { useNavigation } from '@react-navigation/native'; // For navigation
import registerNewUser from '../common/signupUser';
import loginUser from '../common/loginUser';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignUpPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [verifiedPassword, setVerifiedPassword] = useState('');
    const [passwordMatchError, setPasswordMatchError] = useState('');
    const [registerError, setRegisterError] = useState('');

    const navigation = useNavigation();
    const { token, setToken } = useAuthContext();

    useEffect(() => {
        if (token) {
            navigation.navigate('Dashboard'); // Replace with your navigation route name
        }
    }, [token, navigation]);

    const handleRegistration = async () => {
        setPasswordMatchError('');
        setRegisterError('');

        if (verifiedPassword !== password) {
            setPasswordMatchError('Your passwords did not match');
            return;
        }
        try {
        // Check if username already exists
        const usernameExistsResponse = await fetch(`http://192.168.1.45:8000/api/users/${username}`);
        if (usernameExistsResponse.ok) {
            throw new Error('Username already exists');
        }
    
        const userData = {
            username: username,
            password: password,
            verified_password: verifiedPassword,
        };

        
            const responseStatus = await registerNewUser(
                userData,
                `http://my-fastapi-env.eba-bgixmkqg.us-east-1.elasticbeanstalk.com//api/users`,
                setRegisterError
            );

            if (responseStatus === 200) {
                const userToken = await loginUser(userData.username, userData.password);
                setToken(userToken);
                await AsyncStorage.setItem('token', userToken)
                await AsyncStorage.setItem('username', username)
                setUsername('');
                setPassword('');
                console.log('token:', userToken)
                navigation.navigate('Dashboard')
            }
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.formContainer}>
                <Text style={styles.title}>Welcome to CFP Only</Text>
                <Text style={styles.subtitle}>Sign up here!</Text>
                
                <TextInput
                    style={styles.input}
                    placeholder="Username"
                    value={username}
                    onChangeText={(text) => setUsername(text)}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    secureTextEntry={true}
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Verify Password"
                    secureTextEntry={true}
                    value={verifiedPassword}
                    onChangeText={(text) => setVerifiedPassword(text)}
                />

                {passwordMatchError ? <Text style={styles.error}>{passwordMatchError}</Text> : null}
                {registerError ? <Text style={styles.error}>{registerError}</Text> : null}

                <TouchableOpacity
                    style={styles.button}
                    onPress={handleRegistration}
                >
                    <Text style={styles.buttonText}>Signup</Text>
                </TouchableOpacity>

                <View style={styles.loginContainer}>
                    <Text style={styles.loginText}>Already have an account?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('LoginForm')}>
                        <Text style={styles.loginLink}>Login Here</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
    formContainer: {
        width: '80%',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 12,
    },
    subtitle: {
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 24,
    },
    input: {
        borderWidth: 1,
        borderColor: '#CCCCCC',
        borderRadius: 8,
        padding: 10,
        marginBottom: 16,
    },
    button: {
        backgroundColor: 'black',
        borderRadius: 8,
        paddingVertical: 14,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
    },
    error: {
        color: 'red',
        textAlign: 'center',
        marginBottom: 10,
    },
    loginContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    loginText: {
        fontSize: 16,
    },
    loginLink: {
        color: 'orange',
        fontWeight: 'bold',
        marginTop: 6,
    },
});

export default SignUpPage;
