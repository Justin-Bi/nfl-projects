import pickle
import requests
from io import BytesIO
import string

mLink = 'https://github.com/Justin-Bi/nfl-projects/blob/master/api/nfl_graph.pkl?raw=true'
mFile = BytesIO(requests.get(mLink).content)
g = pickle.load(mFile)

verts = g.vert_objs

f = open("demofile2.txt", "w")

for v in verts:
    node_name = verts[v].name
    if any(char in ['*', '+'] for char in node_name):
        node_name = node_name.replace('+', '')
        node_name = node_name.replace('*', '')
        verts[v].name = node_name

with open('./nfl_graph_2.pkl', 'wb') as f:
    pickle.dump(g, f)


# for v in g.vert_objs:
#     node_name = g.vert_objs[v].name
#     if any(char in string.punctuation for char in node_name):
#         # print('punc')
#         f.write(node_name + '\n')



f.close()