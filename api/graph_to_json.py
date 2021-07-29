import pickle
import json

with open('./nfl_graph_4.pkl', 'rb') as f:
    g = pickle.load(f)

with open('./graph.json', 'w') as graph_f:
    json.dump(g.vertices, graph_f, indent=2)
    pass

print(len(g.vertices))
