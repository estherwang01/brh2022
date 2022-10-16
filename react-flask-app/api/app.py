import json
import time
import os
import pandas as pd
import geopandas as gpd
import math
from shapely.geometry import Point, Polygon
from flask import Flask, request, jsonify

app = Flask(__name__)

data_path = r"data"
locales_path = os.path.join(data_path, r"grids.csv")
zipcodes_path = os.path.join(data_path, r"zipcodes.csv")

locales = pd.read_csv(locales_path, index_col=None)
locales.set_index("SUBRGN", inplace=True)
locales = locales.rename(columns=lambda x: x.strip())
locales = locales.to_dict(orient="index")
zipcodes = pd.read_csv(zipcodes_path, index_col=None)
zipcodes.set_index("zip", inplace=True)
zipcodes = zipcodes["Subregion 1"].to_dict()

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
CO2_PER_MILE = 0.9060999 #pounds

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
	if zipcode not in zipcodes_to_coords.index:
		return "", False
	coords = Point(zipcodes_to_coords.loc[zipcode, 'LNG'], zipcodes_to_coords.loc[zipcode, 'LAT'])
	for idx, row in csa_gdf.iterrows():
		if coords.within(row['geometry']):
			return idx, True
	return "", False

def compute_stats(csa: str):
	global csa_gdf, AMERICAN_COMMUTE, CO2_PER_MILE
	car_user_percentage = csa_gdf.loc[csa, 'car_user_percentage']
	total_co2 = car_user_percentage*AMERICAN_COMMUTE*CO2_PER_MILE*365
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
	return {'new_csa' : ncsas[0][1], 'new_car_user_percentage' : csa_gdf.loc[ncsas[0][1], 'car_user_percentage']}, True


# compute_co2(100.0, 1886, 1)


@app.route('/time')
def get_current_time():
	return {'time': time.time()}


@app.route('/zipcode_ithaca')
def get_zipcode():
	return {'region': zipcodes.get(14850, "Unknown")}


@app.route('/check_zip/<int:zipcode>', methods=['GET'])
def check_zip(zipcode: int):
	return {'region': zipcodes.get(zipcode, "Unknown")}


@app.route('/compute_co2', methods=['POST'])
def get_co2():
	body = json.loads(request.data)
	zipcode = body.get("zipcode", "0")
	zipcode = int(zipcode)
	ret_val = {"carbondioxide": 0, "methane": 0, "nitrogen": 0}
	for device in body["devices"]:
		battery_size = 0
		num_charges = device["charges_per_day"]
		if device["mode"] == "normal":
			if device["device_class"] == "laptop":
				if device["device_size"] == "small":
					battery_size = 60.0
				elif device["device_size"] == "large":
					battery_size = 100.0
			elif device["device_class"] == "tablet":
				battery_size = 25.0
			elif device["device_class"] == "phone":
				battery_size = 12.0
		elif device["mode"] == "advanced":
			battery_size = device["device_battery_size_wh"]
		computed_stats = compute_co2(battery_size, zipcode, num_charges)
		ret_val["carbondioxide"] += computed_stats.get("SRCO2RTA", 0)
		ret_val["methane"] += computed_stats.get("SRCH4RTA", 0)
		ret_val["nitrogen"] += computed_stats.get("SRN2ORTA", 0) + computed_stats.get("SRNOXRTA", 0)
	ret_val["spacex_launches"] = ret_val["carbondioxide"] / 300.0 / 2000
	ret_val["annual_cow"] = ret_val["methane"] / 220.0
	ret_val["miles_cheating_volkswagen"] = ret_val["nitrogen"] / 2.2 * 1000 / 1.6 / 1.5
	ret_val["miles_honest_volkswagen"] = ret_val["nitrogen"] / 2.2 * 1000 / 1.6 / 0.043
	return ret_val

@app.route('/compute_cars', methods=['POST'])
def get_stats_cars():
	body = json.loads(request.data)
	zipcode = body.get("zipcode", "0")
	zipcode = int(zipcode)
	ret_val = {}
	csa, success = get_csa_from_zipcode(zipcode)
	ret_val["csa"] = csa
	ret_val["successful_retrieval"] = success
	if not success:
		return ret_val
	stats = compute_stats(csa)
	next_best_csa, response = compute_next_best_csa(csa)
	ret_val.update(stats)
	ret_val.update(next_best_csa)
	ret_val["successful_retrieval_new"] = response
	return ret_val

if __name__ == "__main__":
	app.run(debug=True, host="0.0.0.0", port=int(os.environ.get("PORT", 5000)))



	

		