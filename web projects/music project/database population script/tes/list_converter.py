import re
names = open('name_list.txt').read().split('\n')
finals = open('final_list.txt').read().split('\n')
final_list = []

for num, name in enumerate(finals):
     i = True
     while i:
        if name in names[num]:
            final_list.append(names[num])
            print(name)
            i = False
        else:
            print(names.pop(num), name)
with open('final_things.txt', 'a+') as file:
    for line in final_list:
        file.write(line + '\n')
print(len(final_list))