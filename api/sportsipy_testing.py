from sportsipy.nfl.roster import Player
import pickle
from io import BytesIO
import requests
from tqdm import tqdm
# import pandas as pd

f = open("dup_name_ids.txt", "r")
no_years_f = open("dup_name_ids_no_years.txt", "w")

mLink = 'https://github.com/justin-bi/nfl-projects/blob/master/api/nfl_graph_2.pkl?raw=true'
mFile = BytesIO(requests.get(mLink).content)
g = pickle.load(mFile)

i = 0
thresh = 5
for id in tqdm(f):
    player = Player(id[:-1])
    try:
        seasons = player.dataframe['season'].tolist()
    except Exception as e:
        no_years_f.write(id[:-1] + ',' + str(e) + '\n')
        continue

    season_years = [season for season in seasons if season.isnumeric()]
    # print(g.vert_objs[id[:-1]].name)
    if (season_years):
        years = season_years[0]
    if (len(season_years) > 1):
        years += "-" + season_years[-1]
    g.vert_objs[id[:-1]].name += " (" + years + ")"
    # break
    # i += 1
    # if i > thresh:
    #     break

f.seek(0)
i = 0
for new_id in tqdm(f):
    # print(g.vert_objs[new_id[:-1]].name)
    i += 1
    if i > thresh:
        break
    # break

# with open('./temp.pkl', 'rb') as pickle_file:
#     temp_g = pickle.load(pickle_file)


with open('./temp.pkl', 'wb') as new_pickle:
    pickle.dump(g, new_pickle)

# herb = Player('FielJu00')
# print(herb.dataframe['season'].tolist())
# hester = Player('HestDe99')
# print(list(hester.dataframe['position'].tolist()))
# brees.dataframe.style

f.close()