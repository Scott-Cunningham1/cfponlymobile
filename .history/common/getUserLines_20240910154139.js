const getUserLines = async (userTeams, lines) => {
    // Extract team names from userTeams
    const userTeamNames = userTeams.map(team => team.name || '');
    
    // Create a Set for quick lookups
    const userTeamNamesSet = new Set(userTeamNames);
    
    // Filter lines based on team names
    const finalGames = lines.filter(game => {
      const homeTeam = game.home || '';
      const awayTeam = game.away || '';
      
      // Check if either home or away team is in the userTeamNames set
      return [...userTeamNamesSet].some(teamName => homeTeam.includes(teamName) || awayTeam.includes(teamName));
    });
    
    return finalGames;
  };
  
  export default getUserLines;
