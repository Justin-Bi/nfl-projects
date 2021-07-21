from bs4 import BeautifulSoup
import requests
from tqdm import tqdm
import re

f = open("dup_name_ids.txt", "r")
err_f = open("error_ids.txt", "w")
dates_f = open("birthyear_ids.txt", "w")

lines = f.readlines()

BASE_URL = "https://www.pro-football-reference.com/players/"

for line in tqdm(lines):
    # A player's URL is: BASE_URL + first capitalized letter of the last name + / + player id + .htm
    url = BASE_URL + line[0] + '/' + line[:-1] + '.htm'
    player_page = requests.get(url)

    if player_page.status_code != 200:
        err_f.write(url + ',' + line[:-1] + '\n')
    else:
        player_page_soup = BeautifulSoup(player_page.content, 'html.parser')
        birth = player_page_soup.find_all('span', {'data-birth': re.compile(r"^.*$")})
        dates_f.write(line[:-1])
        if not birth:
            dates_f.write(',empty')
        else:
            dates_f.write(',' + birth[0].get('data-birth'))
        dates_f.write('\n')

        # print(birth)
        # print(player_page_soup(text=re.compile('Born')))
    # break


    # print(player_page.status_code)
    # break

err_f.close()
dates_f.close()