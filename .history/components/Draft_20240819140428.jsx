import React, { useState, useEffect, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, TouchableOpacity, StyleSheet, Image, ImageBackground } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import getTeams from '../common/getTeams'
import getUser from '../common/getUser'



function Draft() {
    const [teams, setTeams] = useState([])
    const [teamToUpdate, setTeamToUpdate] = useState({})
    const [teamOne, setTeamOne] = useState()
    const [user, setUser] = useState({})
    const [token, setToken] = useState('');
    const navigation = useNavigation();


        const getDraftInfo = useCallback(async () => {
          const tokenData = await AsyncStorage.getItem('token');
          setToken(tokenData);
          const username = await AsyncStorage.getItem('username');
          
          if (token) {
            navigation.navigate('LoginForm');
            console.log('no token');
          }

          const teamsData = await getTeams(tokenData);
          setTeams(teamsData);
          console.log('teams:', teams);
          
          const userData = await getUser(tokenData, username);
          setUser(userData);
          console.log('user:', user)
    }, [navigation]);
    useFocusEffect(
        useCallback(() => {
            getDraftInfo();
        })
    )

    
const handleTeamOneChange = (value) => {
    setTeamOne(value)
  
  }

const handleSubmit = async (event) => {
    event.preventDefault();

    // Ensure to await getUser() properly
    

    const teamUrl = `http://192.168.1.45:8000/api/teams/${teamOne}`;

    // Update teamToUpdate with new user ID if needed
    const update = {
        ...teamToUpdate,
        'user_id': 4 // Assuming user.id exists
    };
    console.log(user)
    const fetchConfigPut = {
        method: 'PUT',
        body: JSON.stringify(update), // Use the updated data for PUT request
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    };

    try {
        const response = await fetch(teamUrl, fetchConfigPut);

        if (response.ok) {
            const updatedTeam = await response.json();
            setTeamOne('');  
            navigation.navigate('Dashboard');

        } else {
            console.error('Failed to update team:', response.statusText);
        }
    } catch (error) {
        console.error('Error updating team:', error);
    }

};
   
return (
    <View style={styles.container}>
      <ImageBackground source={require('../assets/bg.png')} resizeMode="cover" style={styles.image}>
        <Text style={styles.heading}>Choose Your Team</Text>
        <View style={styles.form}>
          {teams && teams !== null ? (
            <RNPickerSelect
              items={teams
                  .filter(team => team.user_id === 0)
                  .map(team => ({
                      label: `${team.rank} ${team.name}`,
                      value: `${team.id}`,
                  }))
              }
              placeholder={{label: 'Select a Team'}}
              value={teamOne} // Set value prop to the teamOne state
              onValueChange={value => handleTeamOneChange(value)} // Update teamOne state on change
              style={pickerSelectStyles}
            />
          ) : (
            <Text>Loading...</Text>
         )}
          <TouchableOpacity onPress={handleSubmit} style={styles.button}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
     </ImageBackground>
      </View>

  );
}

export default Draft

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        padding: 16,
        borderRadius: 8,
        backgroundColor: 'white',
        elevation: 4,
        width: '80%',
        alignItems: 'center', // Center horizontally
        justifyContent: 'center', // Center vertically
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        color: 'white'
    },
    form: {
        marginBottom: 16,
        width: 300,
        alignItems: 'center',
  
    },
    button: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        width: 200,
        marginTop: 16
    },
    buttonText: {
        color: '#fe782b',
        fontWeight: 'bold',
    },
    image: {
        width: 500,
        height: 1000,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textInput: {
        width: 400,
        maxHeight: 40,
        minHeight: 40,
        backgroundColor: 'white',
        padding: 5,
        marginBottom: 20,
        flex: 1,
        borderRadius: 8,
        textAlign: 'center',
    },
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 8,
        color: 'white',
        paddingRight: 30,
        textAlign: 'center',
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: 'white',
        borderRadius: 8,
        color: 'white',
        paddingRight: 30,
        textAlign: 'center',
    },
});
