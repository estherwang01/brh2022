from selenium import webdriver
from selenium.webdriver.common.by import By
import json
driver = None

artist_to_link = {}
artist_to_cities = {}
artists_cities_links = {}

def get_artists(start_page, end_page):
  global artist_to_link
  for page in range(start_page, end_page+1):
    driver.get(f"https://www.concertarchives.org/bands?page={page}#band-table")
    table = driver.find_element(By.TAG_NAME, 'table')
    for row in table.find_elements(By.TAG_NAME, 'tr'):
      for cell in row.find_elements(By.TAG_NAME, 'a'):
        if cell.get_attribute("href") != None:
            url = cell.get_attribute("href")
            if url.find('/bands/') != -1 and len(cell.text) > 0:
              artist_to_link[cell.text] = url


def get_cities_from_artist(artist):
  global driver, artists_to_link, artist_to_cities, artists_cities_links
  driver = webdriver.Chrome()
  driver.get(artists_cities_links[artist]['link'])
  cities_list = []
  table = driver.find_element(By.ID, "band-show-table-condensed")
  for row in table.find_elements(By.TAG_NAME, 'tr'):
      for cell in row.find_elements(By.TAG_NAME, 'a'):
          if cell.get_attribute("href") != None:
            url = cell.get_attribute("href")
            if url.find("/locations/") != -1 and len(cell.text) > 0:
              cities_list.append(cell.text)
  driver.quit()
  return cities_list


with open('artists_links_cities.json') as artist_file:
  artists_cities_links = json.load(artist_file)

artists = list(artists_cities_links.keys())

for i in artists[30:60]:
  if 'cities' in artists_cities_links[i]:
    continue
  cities_list = get_cities_from_artist(i)
  artists_cities_links[i]['cities'] = cities_list

with open('artists_links_cities.json', 'w') as artist_file:
  json.dump(artists_cities_links, artist_file, indent=4)
