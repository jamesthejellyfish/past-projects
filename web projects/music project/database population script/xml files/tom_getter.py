import requests
file = open('final_toms.txt')
file = file.read().replace('"', '').split('\n')
file.pop()
#print(file)
for num, line in enumerate(file):
    url = "http://video.google.com/timedtext?lang=en&v=" + line[32:]
    r = requests.get(url, allow_redirects=True)
    open("tom" + str(num) + '.xml', 'wb').write(r.content)
    print(line[0])