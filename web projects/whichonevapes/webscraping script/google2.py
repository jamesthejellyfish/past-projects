import requests
from bs4 import BeautifulSoup
import argparse
import re
import urllib
import math
import numpy as np
import os

query = '"Tom Hanks"'
query = query.replace(' ', '+')
URL = "https://www.google.com/search?q={query}"
USER_AGENT = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.14; rv:65.0) Gecko/20100101 Firefox/65.0"
# mobile user-agent
MOBILE_USER_AGENT = "Mozilla/5.0 (Linux; Android 7.0; SM-G930V Build/NRD90M) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.125 Mobile Safari/537.36"
headers = {"user-agent" : MOBILE_USER_AGENT}
people = os.listdir("C:/Users/hunge/Desktop/pdf/birthdays")
spits = []
number = []
noow = []
slki = []
final = []
with open('test.txt', 'r') as file:
    for line in file:
        line = line.replace("\n", "")
        fields = line.split(" ")
        spits.append('; '+line+'; ')
        number.append(int(fields[0]))
number.sort()
for spit in number:
        tes = [spits.index(i) for i in spits if '; '+str(spit)+" " in i]
        for tst in tes:
            noow.append(spits[int(tst)])
            #print(spits[int(tst)])
#print(number)
noow = list(dict.fromkeys(noow))
#print(noow)
#print(number[math.floor(len(number)/2)-1])
#print(noow[math.floor(len(noow)/2)-1])
print(len(noow))
print(len(number))
#for line in noow:
#    slki = re.split('\d+', line)
#    tes = [noow.index(i) for i in noow if str(slki[1]) in i]
#    try:
#        if len(tes) < 5:
#            del noow[tes[1]]
#            print(tes)
#            print(str(slki[1]))
#    except:
#        l = 1
for x in range(0, len(noow)):
    if int(number[x]) < 750000:
        slki = re.split('\d+', noow[x])
        print(slki[1][1:])
        final.append(slki[1][1:])
for line in final:
    with open('remove_list.txt', 'a+') as file:
        file.write('name="'+str(line).replace("; ", "")+'" OR ')
print(len(final))