import time
import os
import pandas as pd
from flask import Flask


app = Flask(__name__)

data_path = r"data"
locales_path = os.path.join(data_path, "grids.csv")
zipcodes_path = os.path.join(data_path, "zipcodes.csv")

locales = pd.read_csv(locales_path, index_col=None)
locales.set_index("SUBRGN", inplace=True)
locales = locales.to_dict(orient="index")
zipcodes = pd.read_csv(zipcodes_path, index_col=None)
zipcodes.set_index("zip", inplace=True)
zipcodes = zipcodes["Subregion 1"].to_dict()

@app.route('/time')
def get_current_time():
    return {'time': time.time()}

@app.route('/zipcode_ithaca')
def get_zipcode():
    return {'region': zipcodes.get(14850, "Unknown")}



