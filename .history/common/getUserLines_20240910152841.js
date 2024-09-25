

const getUserGames = async (userTeams, lines) => {
    
    const userTeamsNames = []
    for (const team of userTeams) {
        userTeamsNames.push(team.name)
    }
    // Iterate through each teamName
teamNames.forEach(teamName => {
    // Check each game in teamGames
    teamGames.forEach(game => {
      // Check if teamName matches homeTeam or awayTeam
      if (game.homeTeam.includes(teamName) || game.awayTeam.includes(teamName)) {
        finalGames.push(game); // Push the game object into finalGames
      }
    });
  });
};

export default getUserGames;
