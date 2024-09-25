const createBoards= async (teams, users) => {
    // Create a dictionary for quick lookup of user usernames by their id
    const userDict = users.reduce((acc, user) => {
      acc[user.id] = user.username;
      return acc;
    }, {});
  
    // Array to hold the new objects
    const boards = teams
      .filter(team => userDict[team.user_id]) // Ensure there's a matching user
      .map(team => ({
        username: userDict[team.user_id],
        teamName: team.name,
        rank: team.rank
      }));
  
    return boards;
  }

  export default create
