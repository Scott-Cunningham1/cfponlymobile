
const getImageSource = (teamName) => {



  for (const { keyword, source } of imageSources) {
    if (teamName.includes(keyword)) {
      return source;
    }
  }
  // Return a default image if no match is found
  return require('../assets/default.png');
};

export default images
