import pickle
from io import BytesIO
import requests

with open('./temp.pkl', 'rb') as f:
    updated_g = pickle.load(f)

mLink = 'https://github.com/Justin-Bi/nfl-projects/blob/master/api/nfl_graph_2.pkl?raw=true'
mFile = BytesIO(requests.get(mLink).content)
g = pickle.load(mFile)

for vert_obj in updated_g.vert_objs:
    up_vert = updated_g.vert_objs[vert_obj]
    up_vert.search_name = up_vert.name
    up_vert.name = g.vert_objs[vert_obj].name
    if (up_vert.search_name != up_vert.name):
        print(up_vert.search_name, up_vert.name)

with open('./nfl_graph_3.pkl', 'wb') as new_f:
    pickle.dump(updated_g, new_f)