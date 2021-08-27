from sportsipy.nfl.roster import Player
import pickle
from io import BytesIO
import requests
from tqdm import tqdm

f = open("updated_dup_name_ids.txt", "r")

mLink = 'https://github.com/justin-bi/nfl-projects/blob/master/api/nfl_graph_3.pkl?raw=true'
mFile = BytesIO(requests.get(mLink).content)
g = pickle.load(mFile)

i = 1
for id in f:    
    done = False
    vert_obj = g.vert_objs[id[:-1]]
    while not done:
        print("Player ID: " + id[:-1])
        print("Input the search name below")
        search_name = str(input())
        print(f"Are you sure you want {vert_obj.name} ({id[:-1]}) to have search_name {vert_obj.name}{search_name}? Type 'y' for yes and anything else otherwise")
        move_on = str(input())
        if move_on == "y":
            vert_obj.search_name = vert_obj.name + search_name
            print(vert_obj.search_name)
            done = True
            i += 1
            print('-' * 80)
            print(f'Line number {i}')
    # break

# with open('./temp.pkl', 'rb') as pickle_file:
#     temp_g = pickle.load(pickle_file)

with open('./nfl_graph_4.pkl', 'wb') as new_pickle:
    pickle.dump(g, new_pickle)

f.close()