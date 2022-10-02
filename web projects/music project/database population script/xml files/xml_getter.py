import requests
file = open('final_list.txt')
file = file.read().replace('"', '').split('\n')
for num, name in enumerate(file):
    file[num] = name.split('::')
file.pop()
#print(file)
for line in file:
    url = "http://video.google.com/timedtext?lang=en&v=" + line[1][32:]
    r = requests.get(url, allow_redirects=True)
    open(line[0] + '.xml', 'wb').write(r.content)
    print(line[0])