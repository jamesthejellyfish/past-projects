from selenium import webdriver
from selenium.webdriver.chrome.options import Options
import os
import pyautogui as auto
import time
import re
import pyperclip
file = open('popular_songs.txt', 'r')
file = file.read().split('\n')
for num, name in enumerate(file):
    regex = re.compile('\d+ ')
    file[num] = regex.sub('', name).split(' :: ')
#tor_proxy = "127.0.0.1:9150"
chrome_options = Options()
chrome_options.add_argument('--ignore-certificate-errors')
chrome_options.add_argument('disable-infobars')
chrome_options.add_argument("--incognito")
chrome_options.add_argument('--user-data=C:\\Users\\user\\AppData\\Local\\Google\\Chrome\\User Data\\Default')
chrome_options.add_argument("--start-maximized")
chrome_options.add_argument("user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36")
chrome_options.add_argument('--disable-blink-features=AutomationControlled')
#chrome_options.add_argument('--proxy-server=socks5://%s' % tor_proxy)
driver = webdriver.Chrome(executable_path='C:\\chromedriver.exe', options=chrome_options)
song_urls = []
for song in file:
    try:
        #print()
        driver.get("https://www.youtube.com/results?search_query="+ song[1].replace(' ', '+') + '+' + song[0].replace(' ', '+') +"&sp=EgIoAQ%253D%253D")
        elem = driver.find_elements_by_id("video-title")
        print(elem[0].get_attribute('href'))
        song_urls.append(elem[0].get_attribute('href'))
    except:
        print("{} was not run".format(song))
        pyperclip.copy(str(song))
pyperclip.copy(str(song_urls))