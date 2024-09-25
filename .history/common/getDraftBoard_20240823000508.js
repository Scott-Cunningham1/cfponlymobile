const getUsernamesFromTeams = async (teams, users) => {
  
    const userDict = users.reduce((acc, user) => {
      acc[user.id] = user.username;
      return acc;
    }, {});
  

    const usernames = [];
  

    teams.forEach(team => {
      const userId = team.user_id;

      if (userDict[userId]) {
        // Append the corresponding username to the result array
        usernames.push(userDict[userId]);
      }
    });
  
    return usernames;
  }
