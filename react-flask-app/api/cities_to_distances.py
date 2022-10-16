import json,os
from geopy.distance import great_circle
import pandas as pd

data_path = r"data"
cities_path = os.path.join(data_path, r"worldcities_clean.csv")
citiesdf = pd.read_csv(cities_path,index_col=None)
citiesdf = citiesdf.rename(columns=lambda x: x.strip())
countries = citiesdf.copy()
citiesdf.set_index("city", inplace=True)
countries.set_index("country", inplace=True)

with open('json_structures/artists_links_cities.json', 'r') as artist_file:
  artists = json.load(artist_file)

#geolocator = Nominatim(user_agent="Your_Name")
distances = {}
"""
def do_geocode(address, attempt=1, max_attempts=10):
    try:
        return geolocator.geocode(address)
    except GeocoderTimedOut:
        if attempt <= max_attempts:
            return do_geocode(address, attempt=attempt+1)
        raise
"""
def getlatlong(city):
    #print(city)
    try:
        city_name = city[:city.find(',')]
        if " (" in city_name:
            city_name = city_name[:city_name.find(" (")]
        city1 = citiesdf.loc[city_name]
    except:
        try:
            country_name = city[city.rfind(',')+1:].strip()
            if country_name == "US": country_name = "United States"
            city1 = countries.loc[country_name]
        except:
            return None
    if len(city1.shape) == 1:
        return (city1['lat'], city1['lng'])
    else:
        return (city1['lat'][0], city1['lng'][0])
    

for artist in artists:
    cities = artists[artist]["cities"]
    distance = [0,0]
    city1 = getlatlong(cities[0])
    for i in range(1,len(cities)):
        city2 = getlatlong(cities[i])
        if city1 and city2:
            d = great_circle(city1,city2).mi
            if d > 1000:
                distance[0]+=d
            else:
                distance[1]+=d
        city1 = city2
    distances[artist] = distance


with open('json_structures/artists_tour_distances.json', 'w') as artist_tour_file:
    artists = json.dump(distances, artist_tour_file, indent=4)
