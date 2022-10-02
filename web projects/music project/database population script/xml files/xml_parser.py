import re
file = open('tom0.xml', 'r', encoding='utf-8').read().replace("\n", " ")
#print(file)
x = re.findall(r'<text.*?>.*?<\/text>', file)
for line in x:
    r = re.search(r'<text start=.(\d+.?\d*). dur=.(\d+.?\d*).>(.*)<\/text>', line)
    #print(r)
    start = r.group(1)
    duration = r.group(2)
    text = r.group(3)
    text = text.replace('&amp;#39;', "'")
    #text = re.sub(r"[^a-zA-Z0-9_ ']", '', text)
    print(start, duration, text)