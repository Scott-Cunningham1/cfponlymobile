
const getImageSource = (teamName) => {

  const images = [
    {"keyword": "Alabama", "source": require('../assets/schools/alabama.png')},
    {"keyword": "Appalachian State State", "source": require('../assets/schools/appalachian_state.png')},
    {"keyword": "Arizona", "source": require('../assets/schools/arizona.png')},
    {"keyword": "Auburn", "source": require('../assets/schools/auburn.png')},
    {"keyword": "Boise State", "source": require('../assets/schools/boise_state.png')},
    {"keyword": "Clemson", "source": require('../assets/schools/clemson.png')},
    {"keyword": "Georgia", "source": require('../assets/schools/georgia.png')},
    {"keyword": "Iowa State", "source": require('../assets/schools/iowa_state.png')},
    {"keyword": "Iowa", "source": require('../assets/schools/iowa.png')}
    {"keyword": "Kansas State", "source": require('../assets/schools/kansas_state.png')},
    {"keyword": "Kansas", "source": require('../assets/schools/kansas.png')},
    {"keyword": "Liberty", "source": require('../assets/schools/liberty.png')},
    {"keyword": "Louisville", "source": require('../assets/schools/louisville.png')},
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
