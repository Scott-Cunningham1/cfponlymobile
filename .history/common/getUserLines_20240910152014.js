

const getUserGames = async (userTeams, lines) => {
    
    const containsAnyHomeTeam = (homeTeam, homeTeamsArray) => {
        return homeTeamsArray.some(team => homeTeam.includes(team));
      };
      
      // Function to filter matches based on partial home team name
      const filterMatchesByPartialHomeTeams = (matches, homeTeamsArray) => {
        return matches.filter(match => containsAnyHomeTeam(match.homeTeam, homeTeamsArray));
      };
    console.log('user games:', displayGames)



    return displayGames;
};

export default getUserGames;
