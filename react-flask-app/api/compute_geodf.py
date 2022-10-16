import pandas as pd 
import geopandas as gpd 
import math
from shapely.geometry import Point, Polygon


zipcodes_to_coords = pd.read_csv('data/zipcodes_to_coords.csv')
zipcodes_to_coords = zipcodes_to_coords.set_index('ZIP')
csa_transportation = pd.read_csv('data/csa_transportation_data.csv').T
csa_transportation.loc['Label (Grouping)'] = csa_transportation.loc['Label (Grouping)'].apply(lambda x: x.strip())
csa_transportation.columns = csa_transportation.loc['Label (Grouping)']
csa_transportation = csa_transportation.drop(csa_transportation.index[0])

csa_trimmed_df = csa_transportation[list(filter(lambda x: not x[0].isdigit(), list(csa_transportation.columns)))]

csa_trimmed_df = csa_trimmed_df.loc[list(filter(lambda x: not x.endswith('Error'), list(csa_transportation.index)))]
csa_trimmed_df = csa_trimmed_df.rename(index={x: (" ".join(x.split(" ")[:-1]) if "!" in x.strip().split(" ")[-1] else x) for x in csa_trimmed_df.index})
csa_trimmed_df = csa_trimmed_df.drop('United')

csa_trimmed_df = csa_trimmed_df.dropna(how="all")

for column in csa_trimmed_df:
	for idx, row in enumerate(csa_trimmed_df[column]):
		csa_trimmed_df[column][idx] = float(csa_trimmed_df[column][idx].replace(',',''))

csa_gdf = gpd.read_file('data/tl_2019_us_csa.zip')
csa_gdf = csa_gdf.set_index('NAME')

csa_gdf = csa_gdf.join(csa_trimmed_df)

car_indices = list(filter(lambda x: x.startswith("Car"), list(csa_gdf.columns)))

csa_gdf['car_user_percentage'] = csa_gdf[car_indices].sum(axis=1)/csa_gdf["Total:"]

AMERICAN_COMMUTE = 41 # miles
CO2_PER_MILE = 0.411 #kilograms

EARTH_RADIUS = 6371 # kilometers


def distance(p1: Point, p2: Point):
	global EARTH_RADIUS
	x = p1.x
	y = p2.x
	a = p1.y
	b = p2.y
	x, y, a, b = map(math.radians, [x, y, a, b])
	return EARTH_RADIUS*math.acos((math.cos(a)*math.cos(b)*math.cos(x-y))+(math.sin(a)*math.sin(b)))

def get_csa_from_zipcode(zipcode: int):
	global csa_gdf, zipcodes_to_coords
	coords = Point(zipcodes_to_coords.loc[zipcode, 'LNG'], zipcodes_to_coords.loc[zipcode, 'LAT'])
	for idx, row in csa_gdf.iterrows():
		if coords.within(row['geometry']):
			return idx, True
	return 14850, False

def compute_stats(csa: str):
	global csa_gdf, AMERICAN_COMMUTE, CO2_PER_MILE
	car_user_percentage = csa_gdf.loc[csa, 'car_user_percentage']
	total_co2 = car_user_percentage*AMERICAN_COMMUTE*CO2_PER_MILE
	return {"car_user_percentage" : car_user_percentage, "total_co2": total_co2}

def compute_next_best_csa(csa: str):
	global csa_gdf
	csas = []
	curr_car_user_percentage = csa_gdf.loc[csa, 'car_user_percentage']
	curr_pt = csa_gdf.loc[csa, 'geometry'].centroid
	for idx, row in csa_gdf.iterrows():
		if idx != csa:
			csas.append((distance(curr_pt, row['geometry'].centroid), idx))
	csas.sort()
	ncsas = list(filter(lambda x: csa_gdf.loc[x[1], 'car_user_percentage'] < curr_car_user_percentage, csas))
	if len(ncsas) == 0:
		return {}, False
	return {'csa' : ncsas[0][1], 'percentage' : csa_gdf.loc[ncsas[0][1], 'car_user_percentage']}, True

csa, result = get_csa_from_zipcode(20165)
print(csa)
print(compute_stats(csa))
print(compute_next_best_csa(csa))