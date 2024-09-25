
const getImageSource = (teamName) => {

  const images = [
    {"keyword": "Georgia", "source": require('../assets/georgia.png')},
    {"keyword": "Oklahoma State", "source": require('../assets/georgia.png')}
    "Oklahoma State": require('../assets/oklahoma_state.png'),
    "Iowa State": require('../assets/iowa_state.png'),
    "Clemson": require('../assets/clemson.png'),
    "West Virginia": require('../assets/west_virginia.png'),
    "Alabama": require('../assets/alabama.png'),
    "Ohio State": require('../assets/ohio_state.png'),
    "Tennessee": require('../assets/tennessee.png'),
    "Michigan": require('../assets/michigan.png'),

    // Add other mappings here
    ];

  for (const { keyword, source } of images) {
    if (teamName.includes(keyword)) {
      return source;
    }
  }
  // Return a default image if no match is found
  return require('../assets/Logo.png');
};

export default getImageSource
