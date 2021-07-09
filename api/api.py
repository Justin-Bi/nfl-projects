import time
from flask import Flask, request
import pickle
from Graph import Graph
from Vertex import Vertex
import json

with open('./nfl_graph.pkl', 'rb') as f:
    g = pickle.load(f)
# print(len(g.vertices))

app = Flask(__name__, static_folder='../build', static_url_path='/')

@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.route('/api/time')
def get_current_time():
    return {'time': time.time()} 

@app.route('/api/length')
def get_graph_length():
    return {'graphSize': len(g.vertices)}

@app.route('/api/path', methods=["POST"])
def get_path(): 
    player_dict = request.get_json()
    p1 = player_dict['player1']
    p2 = player_dict['player2']
    if p1 in g.vertices and p2 in g.vertices:
        path = g.find_path(p1, p2)
    else:
        path = []
    for idx, item in enumerate(path):
        path[idx] = g.vert_objs[item].name
    return {'path': path}
