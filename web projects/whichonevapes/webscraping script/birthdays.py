from bs4 import BeautifulSoup
import requests
import shutil
import re
MAIN_URL = 'https://www.famousbirthdays.com'
url = MAIN_URL + '/' + 'profession/tvactress' + '.html'
MONTHS = {
  'january': {'id': 1 , 'total': 31},
  'february': {'id': 2 , 'total': 29},
  'march': {'id': 3 , 'total': 31},
  'april': {'id': 4 , 'total': 30},
  'may': {'id': 5 , 'total': 31},
  'june': {'id': 6 , 'total': 30},
  'july': {'id': 7 , 'total': 31},
  'august': {'id': 8 , 'total': 31},
  'september': {'id': 9 , 'total': 30},
  'october': {'id': 10 , 'total': 31},
  'november': {'id': 11 , 'total': 30},
  'december': {'id': 12 , 'total': 31}
}
professions = {
  'actress',
  'actor',
#  'model',
#  'comedian',
#  'basketballplayer',
#  'wrestler',
  'singer',
  'webvideostar'


}

def html_extract_day_page(body):

    soup = BeautifulSoup(body, 'html.parser')
    birthdays = soup.find_all('a', class_='person-item')

    persons = []

    for b in birthdays:
        person = get_person_information(b.attrs['href'])

        if person:
            persons.append(person)

    return persons


def get_person_information(url):

    try:
        response = requests.get(url, timeout=10)
    except requests.exceptions.Timeout:
        return None

    if response.status_code != 200:
        return None

    person = {}

    soup = BeautifulSoup(response.text, 'html.parser')

    '''
        Get profession
    '''

    person_title = soup.find('div', class_='person-title')
    if person_title:
        person['profession'] = person_title.get_text().replace('\n', '')
    else:
        person['profession'] = ''

    '''
        Get title
    '''

    tag_name = soup.find('h1')
    div = tag_name.find('div')

    if not div:
        return None

    div.clear()
    person['title'] = tag_name.get_text().replace('\n', '')

    '''
        Get bio
    '''

    bio = soup.find('div', class_='bio')
    person['body'] = str(bio)

    '''
        Get picture
    '''

    img_container = soup.find('div', class_='img1')
    img = img_container.find('img')
    person['avatar'] = img.attrs['src']

    '''
        Get birthyear
    '''

    stat_container = soup.find('div', class_='stat')
    stat_container_link_children = stat_container.find_all('a')

    try:
        person['year'] = int(stat_container_link_children[-1].get_text())
    except ValueError:
        return None

    '''
        Is dead?
    '''

    try:
        age_container = soup.find('i', class_='icn-age')
        age_container_text = age_container.nextSibling.nextSibling.get_text()
        if age_container and 'Death' in age_container_text:
            person['death'] = True
        else:
            person['death'] = False
    except:
        person['death'] = False

    return person



#for month in MONTHS:
#    for day in range(1, MONTHS[month]['total']):
#        url = MAIN_URL + '/' + month + str(day) + '.html'
#        response = requests.get(url)
#        if response.status_code != 200:
#            print('detail' + 'invalid url')
#        persons = html_extract_day_page(response.text)
#        for person in persons:
#            print(person['title'])

#response = requests.get(url)
#if response.status_code != 200:
#    print('detail' + 'invalid url')
#persons = html_extract_day_page(response.text)
for profession in professions:
    for age in range(35, 90):
            try:
                url = MAIN_URL + '/age/profession/' + profession + '-' + str(age) + '.html'
                response = requests.get(url)
                if response.status_code != 200:
                    print('detail' + 'invalid url')
                persons = html_extract_day_page(response.text)
                for person in persons[:20]:
                    print(person['title']+': ' +person['profession'])
                    s = person['body']
                    result = re.search('id="btn-edit" title="Send Suggestion"><i class="icn icn-edit"></i></a></h2>\n<p>(.*)</p>\n<h2>Before Fame</h2>\n<p>', s)
                    #print(result.group(1))
                    image_url = person['avatar']
                    filename = person['title'].replace(" ", "_") +'.jpg'
                    r = requests.get(image_url, stream = True)
                    with open(filename,'wb') as f:
                        shutil.copyfileobj(r.raw, f)
                    with open('sql_list.txt', 'a+') as file:
                        file.write("\n('"+person['title'].replace("'", "")+"', '"+person['profession']+"', '"+result.group(1).replace("'", "\\'")+"', 0),")
                        #print('\n'+person['title']+"', '"+person['profession']+"', '"+result.group(1).replace("'", "\'")+"', 0),")
            except:
                print('error connecting to server at age: ' + str(age))


print(persons)