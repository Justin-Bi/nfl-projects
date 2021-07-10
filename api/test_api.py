import pickle
from Graph import Graph
from Vertex import Vertex
import json

with open('./nfl_graph.pkl', 'rb') as f:
    g = pickle.load(f)

vert_dict = {}

for vert in g.vert_objs:
    vert_dict[vert] = {
        'name': g.vert_objs[vert].name,
        'isPlayer': g.vert_objs[vert].isPlayer,
        # 'neighbors': g.vert_objs[vert].neighbors
    }

with open("vert_objs.json", "w") as outfile:
    json.dump(vert_dict, outfile)
