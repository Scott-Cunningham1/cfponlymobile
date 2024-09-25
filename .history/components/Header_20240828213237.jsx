import React from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import Logo from '../assets/Logo.png'

const Header = ({ imageSource }) => {
  // Get screen dimensions
  const { height } = Dimensions.get('window');
  
  // Calculate the height of the header (10% of the screen height)
  const headerHeight = height * 0.09;

  return (
    <View style={[styles.header, { height: headerHeight }]}>
      {imageSource && <Image source={Logo} style={styles.image} />}
    </View>
  );
};

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#fe813b',
        justifyContent: 'center', // Centers image vertically
        alignItems: 'center', // Centers image horizontally
        position: 'absolute', // Ensures header doesn't affect other content
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1,
      },
  image: {
    width: 200,
    height: 80,
    resizeMode: 'cover', // Adjusts how the image fits the header
  },
});

export default Header;
