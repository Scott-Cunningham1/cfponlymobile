import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import getRankings from '../common/getRankings'

const { height } = Dimensions.get('window');

const NumberCard = ({ number, onPress }) => (
  <TouchableOpacity style={styles.card} onPress={() => onPress(number)}>
    <Text style={styles.cardText}>{number}</Text>
  </TouchableOpacity>
);

const NumberScreen = async () => {
  const navigation = useNavigation();
  const tokenData = await AsyncStorage.get('token');
  const ranking = await getRankings(tokenData, '')
      console.log('ranking:', ranking)

  // Function to handle card press
  const handleCardPress = async (number) => {
    try {
      console.log('Card pressed:', number);
      const numberString = number.toString()
      await AsyncStorage.setItem('matchup_week', numberString); // Ensure value is a string
      const check = await AsyncStorage.getItem('matchup_week')
      console.log("matchup_week", check)
      
      navigation.navigate('Matchups');
    } catch (error) {
      console.error('Error setting AsyncStorage:', error);
    }
  };

  // Create an array of numbers from 1 to 14
  const numbers = Array.from({ length: 14 }, (_, index) => index + 1);

  return (
    <View style={styles.container}>
      <FlatList
        data={numbers}
        renderItem={({ item }) => (
          <NumberCard number={item} onPress={handleCardPress} />
        )}
        keyExtractor={(item) => item.toString()}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 10,
  },
  list: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  card: {
    height: height / 10,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    marginBottom: 10,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  cardText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default NumberScreen;