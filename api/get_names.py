import pickle
from pprint import pprint
from tqdm import tqdm

with open("nfl_graph_4.pkl", "rb") as f:
    g = pickle.load(f)

# pprint(dir(g))
# pprint(g.teams)

print(g.players)

# player_names = []

# for v in tqdm(g.vert_objs):
#     if g.vert_objs[v].isPlayer:
#         player_names.append(g.vert_objs[v].search_name)
# g.players = player_names
# with open("nfl_graph_4.pkl", "wb") as f:
#     pickle.dump(g, f)
