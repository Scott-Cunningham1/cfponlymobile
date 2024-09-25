

const getUserLines = async (user_id, lines) => {
    
    const userTeamNames = []
    for (const team of userTeams) {
        userTeamNames.push(team.name)
    }
    console.log("FUNCTION userTeamNames:", userTeamNames)
    console.log("FUCNTION lines:", lines)
    const finalGames = []
    // Iterate through each teamName
userTeamNames.forEach(teamName => {
    // Check each game in teamGames
    lines.forEach(game => {
      // Check if teamName matches homeTeam or awayTeam
      if (game.home.includes(teamName) || game.away.includes(teamName)) {
        finalGames.push(game); // Push the game object into finalGames
      }
    });
  });
  return finalGames
};

export default getUserLines;
