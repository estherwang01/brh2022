import pandas as pd 
from geopy.geocoders import Nominatim

def compute_distances(city1, city2):
  geolocator = Nominatim()