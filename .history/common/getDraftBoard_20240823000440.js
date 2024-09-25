const getUsernamesFromTeams = async (teams, users) {
    // Create a dictionary (object) for quick lookup of user usernames by their id
    const userDict = users.reduce((acc, user) => {
      acc[user.id] = user.username;
      return acc;
    }, {});
  
    // Array to hold the usernames of teams' users
    const usernames = [];
  
    // Iterate over the list of teams
    teams.forEach(team => {
      const userId = team.user_id;
      // Check if the user_id exists in the userDict
      if (userDict[userId]) {
        // Append the corresponding username to the result array
        usernames.push(userDict[userId]);
      }
    });
  
    return usernames;
  }
