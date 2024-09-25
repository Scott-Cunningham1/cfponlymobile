
const getImageSource = (teamName) => {

  const images = [
    {"keyword": "Georgia", "source": require('../assets/schools/georgia.png')},
    {"keyword": "Oklahoma State", "source": require('../assets/schools/oklahoma_state.png')},
    {"keyword": "Iowa State", "source": require('../assets/schools/iowa_state.png')},
    {"keyword": "Clemson", "source": require('../assets/schools/clemson.png')},
    {"keyword": "West Virginia", "source": require('../assets/schools/west_virginia.png')},
    {"keyword": "Alabama", "source": require('../assets/schools/alabama.png')},
    {"keyword": "Ohio State", "source": require('../assets/schools/ohio_state.png')},
    {"keyword": "Tennessee", "source": require('../assets/schools/tennessee.png')},
    {"keyword": "Michigan", "source": require('../assets/schools/michigan.png')}


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
