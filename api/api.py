import time
from flask import Flask, request
import pickle
from Graph import Graph
from Vertex import Vertex
import json

app = Flask(__name__, static_folder='../build', static_url_path='/')

with open('./nfl_graph.pkl', 'rb') as f:
    g = pickle.load(f)

@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.route('/api/time')
def get_current_time():
    return {'time': time.time()} 