from sportsipy.nfl.roster import Player

# player = Player('WrigWi20')
p2 = Player('SmitJo01')
# print(player)
print(p2)
p2_vars = vars(p2)
for v in p2_vars:
    if p2_vars[v]:
        print(v + ': ' + str(p2_vars[v]))
        