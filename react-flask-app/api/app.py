import json
import time
import os
import pandas as pd
from flask import Flask, request, jsonify

app = Flask(__name__)

data_path = r"data"
locales_path = os.path.join(data_path, r"grids.csv")
zipcodes_path = os.path.join(data_path, r"zipcodes.csv")

locales = pd.read_csv(locales_path, index_col=None)
locales.set_index("SUBRGN", inplace=True)
locales = locales.to_dict(orient="index")
zipcodes = pd.read_csv(zipcodes_path, index_col=None)
zipcodes.set_index("zip", inplace=True)
zipcodes = zipcodes["Subregion 1"].to_dict()


def compute_co2(battery_size: float, zipcode: int, num_charges: int = 1) -> dict:
	global locales, zipcodes
	watt_hour_charge = battery_size * 2
	multiplier = watt_hour_charge * num_charges / 1000000 * 365
	power_grid_name = zipcodes.get(zipcode, "Unknown")
	if power_grid_name == "Unknown":
		return "Unknown"
	power_grid = locales[power_grid_name]
	for key in power_grid:
		power_grid[key] *= multiplier
	return power_grid


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
	zipcode = int(request.json['zipcode'])
	ret_val = {"carbondioxide": 0, "methane": 0, "nitrogen": 0, "sulfur": 0}
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
		ret_val["carbondioxide"] += computed_stats["SRCO2RTA"]
		ret_val["methane"] += computed_stats["SRCH4RTA"]
		ret_val["nitrogen"] += computed_stats["SRN2ORTA"] + computed_stats["SRNOXRTA"]
	ret_val["spacex_launches"] = ret_val["carbondioxide"] / 300.0 / 2000
	ret_val["annual_cow"] = ret_val["methane"] / 220.0
	ret_val["miles_cheating_volkswagen"] = ret_val["nitrogen"] / 2.2 * 1000 / 1.6 / 1.5
	ret_val["miles_honest_volkswagen"] = ret_val["nitrogen"] / 2.2 * 1000 / 1.6 / 0.043