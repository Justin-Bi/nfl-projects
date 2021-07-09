import pickle

with open('./nfl_graph.pkl', 'rb') as f:
    g_from_graph_obj = pickle.load(f)