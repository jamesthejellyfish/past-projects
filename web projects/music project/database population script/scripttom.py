from selenium import webdriver
from selenium.webdriver.chrome.options import Options
import os
import pyautogui as auto
import time
import re
import pyperclip
#final_list = open('final_list.txt', 'a+')
#file = open('popular_songs.txt', 'r')
#file = file.read().split('\n')
#for num, name in enumerate(file):
#    regex = re.compile('\d+ ')
#    file[num] = regex.sub('', name).split(' :: ')
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
#print()
driver.get("https://www.youtube.com/results?search_query=Tom+Scott")
time.sleep(1)
driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
time.sleep(1)
elem = driver.find_elements_by_id("video-title")
for video in elem:
    x = video.get_attribute('href')
    print(x)
    with open('final_toms.txt', 'a+') as final_list:
        final_list.write(str(x) + '\n')