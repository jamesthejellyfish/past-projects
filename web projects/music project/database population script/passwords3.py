from selenium import webdriver
from selenium.webdriver.chrome.options import Options
import os
import pyautogui as auto
import time
f = open('x.jpg')
file = f.readlines()
delim = input('Delimiter:')
website = input('website:')
passwords = []
for line in file:
    temp = line.strip().split(delim)
    if len(temp) == 2:
        passwords.append((temp[0],temp[1]))
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
for password in passwords:
    driver.get(website)
    elem = driver.find_element_by_id("video-title")
    print(elem)
    """elem.send_keys(password[0])
    elem1 = driver.find_element_by_name("password")
    elem1.clear()
    elem1.send_keys(password[1])
    #auto.press('tab')
    #time.sleep(0.3)
    #auto.press('tab')
    #auto.press('space')
    auto.press('enter')
    while 'Invalid username/password!' not in driver.page_source:
        x = 5"""
    while 1:
        x = 1