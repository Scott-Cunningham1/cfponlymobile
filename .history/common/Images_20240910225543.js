
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
    {"keyword": "Iowa", "source": require('../assets/schools/iowa.png')},
    {"keyword": "Kansas State", "source": require('../assets/schools/kansas_state.png')},
    {"keyword": "Kansas", "source": require('../assets/schools/kansas.png')},
    {"keyword": "Liberty", "source": require('../assets/schools/liberty.png')},
    {"keyword": "Louisville", "source": require('../assets/schools/louisville.png')},
    {"keyword": "LSU", "source": require('../assets/schools/lsu.png')},
    {"keyword": "Memphis", "source": require('../assets/schools/memphis.png')},
    {"keyword": "Miami", "source": require('../assets/schools/miami.png')},
    {"keyword": "Michigan", "source": require('../assets/schools/michigan.png')},
    {"keyword": "Missouri", "source": require('../assets/schools/missouri.png')},
    {"keyword": "NC State", "source": require('../assets/schools/nc_state.png')},
    {"keyword": "Notre Dame", "source": require('../assets/schools/notre_dame.png')},
    {"keyword": "Ohio State", "source": require('../assets/schools/ohio_state.png')},
    {"keyword": "Oklahoma State", "source": require('../assets/schools/oklahoma_state.png')},
    {"keyword": "Oklahoma", "source": require('../assets/schools/oklahoma.png')},
    {"keyword": "Ole Miss", "source": require('../assets/schools/ole_miss.png')},
    {"keyword": "Oregon", "source": require('../assets/schools/oregon.png')},
    {"keyword": "Penn State", "source": require('../assets/schools/penn_state.png')},
    {"keyword": "SMU", "source": require('../assets/schools/smu.png')},
    {"keyword": "Tennessee", source": require('../assets/schools/kansas_state.png')},
    {"keyword": "Kansas", "source": require('../assets/schools/kansas.png')},
    {"keyword": "Liberty", "source": require('../assets/schools/liberty.png')},
    {"keyword": "Louisville", "source": require('../assets/schools/louisville.png')},
    {"keyword": "LSU", "source": require('../assets/schools/lsu.png')},
    {"keyword": "Memphis", "source": require('../assets/schools/memphis.png')},
    {"keyword": "Miami", "source": require('../assets/schools/miami.png')},
    {"keyword": "Michigan", "source": require('../assets/schools/michigan.png')},
    {"keyword": "Missouri", "source": require('../assets/schools/missouri.png')},


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
