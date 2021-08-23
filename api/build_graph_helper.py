import pickle
import json

with open('./temp-json.pkl', 'rb') as old_pickle:
    g = pickle.load(old_pickle)

with open('./build_graph_helper.json', 'w') as temp_f:
    json.dump(g.vertices, temp_f, indent=2)
