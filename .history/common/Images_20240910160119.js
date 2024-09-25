
const getImages = async (teamName) => {
  for (const i of imagesRaw) {
    if (i.includes(teamName)){
      return imagesRaw[i]
    }
    else return require('../assets/Logo.png')
  }

}
  export default getImages;
