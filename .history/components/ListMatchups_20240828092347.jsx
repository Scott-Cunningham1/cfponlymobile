import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { height, width } = Dimensions.get('window');
const navigation = useNavigation();

const NumberCard = ({ number, onPress }) => (
  <TouchableOpacity style={styles.card} onPress={() => onPress(number)}>
    <Text style={styles.cardText}>{number}</Text>
  </TouchableOpacity>
);

function NumberScreen ()  {
  // Function to handle card press
  const handleCardPress = (number) => {
    console.log('Card pressed:', number);
    AsyncStorage.setItem('matchup_week', number);
    navigation.navigate('Matchups')

    
    
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
