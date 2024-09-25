rankings = [{"name": "Georgia", "rank": "5"}, {"name": "Illinois", "rank": "20"}]
drafted_teams = ["Georgia", "Illinois"]
teams = []
for rank in rankings:
    if rank["name"] in drafted_teams:
        teams.append(f"{rank['rank']} {rank['name']}")

print(teams)
