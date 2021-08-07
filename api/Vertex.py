# The Vertex class specifies whether the vertex contains a player or a team, and it also specifies all of its neighbors.
# If the vertex is a player, then all of its neighbors are the teams they've been on the roster for. If the vertex is a
# team, all of its neighbors are the players on their roster for that year.

class Vertex:
    def __init__(self, name, id, isPlayer):
        self.name = name    # The English name, eg Aaron Rodgers or 2020 Green Bay Packers
        # These search_names are unique, should eventually just replace name
        self.search_name = ""
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
