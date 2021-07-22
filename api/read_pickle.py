import pickle
import requests
from io import BytesIO
import string

# Load the graph
mLink = 'https://github.com/Justin-Bi/nfl-projects/blob/master/api/nfl_graph_3.pkl?raw=true'
mFile = BytesIO(requests.get(mLink).content)
g = pickle.load(mFile)

verts = g.vert_objs

# f = open("dup_name_ids.txt", "w")
# f = open("dup_names_and_ids.txt", "w")
f = open("updated_dup_name_ids.txt", "w")

# Get duplicate players
flipped = {}
for key, vert in verts.items():
    name = vert.search_name
    if name not in flipped:
        flipped[name] = [key]
    else:
        flipped[name].append(key)

x = {val: flipped[val] for val in flipped if len(flipped[val]) > 1}
for item in x:
    # f.write(item)
    id_arr = x[item]
    for id in id_arr:
        # f.write(',' + id)
        f.write(id + '\n') 
    # f.write('\n')
    # break

# player_to_id = {}
# id_to_player = {}

# for v in verts:
#     if (verts[v].isPlayer):
#         player_to_id[verts[v].name] = v
#         id_to_player[v] = verts[v].name
# print(len(player_to_id))
# print(len(id_to_player))

# Remove all extra punctuation
def strip_punctuation():
    for v in verts:
        node_name = verts[v].name
        if any(char in ['*', '+'] for char in node_name):
            f.write(node_name + '\n')
            node_name = node_name.replace('+', '')
            node_name = node_name.replace('*', '')
            verts[v].name = node_name

# for v in g.vert_objs:
#     node_name = g.vert_objs[v].name
#     if any(char in string.punctuation for char in node_name):
#         # print('punc')
#         f.write(node_name + '\n')



f.close()