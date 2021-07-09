import pickle
from Graph import Graph
from Vertex import Vertex

with open('./pickled_graph_eighty_six_teams.pkl', 'rb') as f:
    g = pickle.load(f)

new_graph = g
print(len(new_graph.vertices))
with open('nfl_graph.pkl', 'wb') as f:
    pickle.dump(g, f)