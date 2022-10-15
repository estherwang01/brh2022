import time
import os
import pandas as pd
from flask import Flask

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


def compute_co2(battery_size, zipcode):
	global locales, zipcodes
	total_wH_per_charge = battery_size * 2
	power_grid_name = zipcodes[zipcode]
	power_grid_co2 = locales[power_grid_name]["SRCO2RTA"]
	total_co2 = (total_wH_per_charge / 1000) * power_grid_co2
	return total_co2


@app.route('/time')
def get_current_time():
	return {'time': time.time()}


@app.route('/zipcode_ithaca')
def get_zipcode():
	return {'region': zipcodes.get(14850, "Unknown")}
