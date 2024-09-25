import React from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';

const CustomHeader = ({ imageSource }) => {
  // Get screen dimensions
  const { height } = Dimensions.get('window');
  
  // Calculate the height of the header (10% of the screen height)
  const headerHeight = height * 0.10;

  return (
    <View style={[styles.header, { height: headerHeight }]}>
      {imageSource && <Image source={imageSource} style={styles.image} />}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'black',
    justifyContent: 'center', // Centers image vertically
    alignItems: 'center', // Centers image horizontally
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover', // Adjusts how the image fits the header
  },
});

export default CustomHeader;
