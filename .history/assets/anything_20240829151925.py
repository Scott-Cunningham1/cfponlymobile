rankings = {"name": "Georgia", "rank": "5"}
drafted_teams = ["Georgia", "Illinois"]
teams = []
for rank in rankings:
    if rank[""] in drafted_teams:
        teams.append(f"{rank['rank']} {rank['name']}")

print(teams)
