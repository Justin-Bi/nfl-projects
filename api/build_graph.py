from sportsipy.nfl.roster import Roster
from sportsipy.nfl.teams import Teams
from sportsipy.nfl.teams import Team
from Graph import Graph
from Vertex import Vertex
from tqdm import tqdm
import pickle

f = open("years.txt", "a")

with open('./temp-json.pkl', 'rb') as old_pickle:
    g = pickle.load(old_pickle)
print(len(g.vertices))
print(g.vertices['gnb/1941'])

# ONLY DO THIS UP TO 2020, as 2021's roster changes take place, just update the base 2020 graph instead of having to
# rebuild the whole thing from scratch

# Start at 1965
for year in range(1965, 1970):
    print("=" * 50)
    print("Year:", year)
    try:
        teams = Teams(year)
        if (year == 2021):
            print("Year is 2021, need to do smth special")
        for team in tqdm(teams):
            team_name = str(year) + " " + team.name
            team_id = team.abbreviation.lower() + "/" + str(year)
            v = Vertex(team_name, team_id, False)
            g.add_vertex(v)
            ros = team.roster
            for player in ros.players:
                g.add_edge(g.vert_objs[team_id], Vertex(
                    player.name, player.player_id, True))
        print(len(g.vertices))
        print(len(g.vert_objs))
        f.write(str(year) + '\n')
        with open('./temp-json.pkl', 'wb') as new_pickle:
            pickle.dump(g, new_pickle)
    except Exception as e:
        print("Excepted year", year)
        print("Exception:", e)
print("=" * 50)
# ros = Roster('SDG', year=2022, slim=True)
# print(ros.coach)

# for i in range(2000, 2001):
#     teams = Teams(year=i)
#     for team in teams:
#         print(team.abbreviation)
# for team in teams:
#     print(team.name)
