import time
from flask import Flask, request
import json
import pickle
from io import BytesIO
import requests
import random

app = Flask(__name__, static_folder='../build', static_url_path='/')


class Vertex:
    def __init__(self, name, id, isPlayer):
        self.name = name    # The English name, eg Aaron Rodgers or 2020 Green Bay Packers
        self.id = id    # id is what is used to identify the player/team, since same names exist
        # If true, is player; if false, is team. Only these two choices exist
        self.isPlayer = isPlayer
        self.neighbors = []

    def add_neighbor(self, neighbor):
        if isinstance(neighbor, Vertex):
            # If they're not already neighors, then add them to both
            if neighbor.id not in self.neighbors:
                self.neighbors.append(neighbor.id)
                neighbor.neighbors.append(self.id)
        else:
            return False


class Graph:
    def __init__(self):
        self.vertices = {}
        self.vert_objs = {}
        # Specifically keep track of teams, so as to know where to pick up from next time.
        self.teams = []

    # Add a vertex to the graph, include its current neighbors into the adjacency list
    def add_vertex(self, vertex):
        if isinstance(vertex, Vertex):
            self.vertices[vertex.id] = vertex.neighbors
            self.vert_objs[vertex.id] = vertex

    # Add an edge between two vertices. If any of the vertices were not already in the graph, then add
    # them to the graph. For our purposes, the API doesn't ensure that the two vertices are of opposite
    # types (might be something to look into)
    def add_edge(self, v_from, v_to):
        if isinstance(v_from, Vertex) and isinstance(v_to, Vertex):
            # Change this so the var names aren't so long
            if v_from.id not in self.vert_objs.keys():
                self.add_vertex(v_from)
            if v_to.id not in self.vert_objs.keys():
                self.add_vertex(v_to)
            self.vert_objs[v_from.id].add_neighbor(self.vert_objs[v_to.id])
            self.vertices[v_from.id] = self.vert_objs[v_from.id].neighbors
            self.vertices[v_to.id] = self.vert_objs[v_to.id].neighbors

    # Return the adjacency list of the graph
    def adjacency_list(self):
        if len(self.vertices) >= 1:
            return [str(key) + ":" + str(self.vertices[key]) for key in self.vertices.keys()]
        else:
            return {}

    # Return all vertices in the graph by ID
    def all_vertices(self):
        return self.vertices.keys()

    # Return all player vertices
    def all_player_vertices(self):
        players = []
        for v in self.vertices:
            if v.isPlayer:
                players.append(v)
        return players

    # Return all team vertices (including yearly rosters)
    def all_team_vertices(self):
        teams = []
        for v in self.vertices:
            if not v.isPlayer:
                teams.append(v)
        return teams

    # Code from https://www.geeksforgeeks.org/building-an-undirected-graph-and-finding-shortest-path-using-dictionaries-in-python/
    # Returns an empty list if no path exists

    def find_path(self, source_id, target_id):

        # Edge case where they're the same
        if source_id == target_id:
            return [source_id]

        visited = []    # Tracks visited vertices
        queue = [[source_id]]   # Vertices to visit

        while queue:
            path = queue.pop(0)
            node = path[-1]

            # If the node was visited already, can skip
            if node not in visited:
                neighbours = self.vertices[node]

                # Loop to iterate over the neighbors of the node
                for neighbour in neighbours:
                    new_path = list(path)
                    new_path.append(neighbour)
                    queue.append(new_path)

                    # Check if the neighbor node is the goal
                    if neighbour == target_id:
                        return new_path
                visited.append(node)

        # Condition when the nodes
        # are not connected
        return []

    # Get all the teammates a player has ever been on a roster with (in essence,
    # all nodes that are two edges away (one for team, one for players))
    def get_all_teammates(self, player_id):

        pass

    # Get a string representation of the graph
    def __repr__(self):
        return str(self.adjacency_list())

# with open('./temp.pkl', 'wb') as f:
#     pickle.dump('new test', f)


# mLink = 'https://github.com/Justin-Bi/nfl-projects/blob/master/api/nfl_graph_3.pkl?raw=true'
mLink = 'https://github.com/Justin-Bi/nfl-projects/blob/master/api/nfl_graph_4.pkl?raw=true'
mFile = BytesIO(requests.get(mLink).content)
g = pickle.load(mFile)
# print("In api")
# print(g.find_path('GrahOt00', 'RodgAa00'))
# print("Out of api")
# h = len(tmp.vertices)

print(g.find_path("HerbJu00", "AlleKe00"))


@app.errorhandler(404)
def not_found(e):
    return app.send_static_file('index.html')


@app.route('/')
def index():
    return app.send_static_file('index.html')


@app.route('/api/path', methods=["POST"])
def get_path():
    player_dict = request.get_json()
    name_one = player_dict['player1']
    name_two = player_dict['player2']

    # Change the names into their IDs
    p1 = g.name_to_id(name_one)
    p2 = g.name_to_id(name_two)

    if p1 in g.vertices and p2 in g.vertices:
        path = g.find_path(p1, p2)
    else:
        path = []
    for idx, item in enumerate(path):
        path[idx] = g.vert_objs[item].search_name
    return {'path': path}


@app.route('/api/get_random_player', methods=["GET"])
# Return a random player
def get_random_player():
    return {"player": random.choice(g.players)}


@app.route('/api/get_all_players', methods=["GET"])
# Get all the players (for the select input)
def get_all_players():
    return {"players": g.players}
