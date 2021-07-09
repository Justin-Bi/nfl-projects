from Vertex import Vertex

# Based on https://pythonandr.com/2016/07/28/implementing-undirected-graphs-in-python/

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
        # return str(g.adjacencyList()) + '\n' + '\n' + str(g.adjacencyMatrix())
        return str(self.adjacency_list())