import pandas as pd 
import geopandas as gpd 

zipcodes_to_coords = pd.read_csv('data/zipcodes_to_coords.csv')
csa_transportation = pd.read_csv('data/csa_transportation_data.csv').T
csa_transportation.loc['Label (Grouping)'] = csa_transportation.loc['Label (Grouping)'].apply(lambda x: x.strip())
csa_transportation.columns = csa_transportation.loc['Label (Grouping)']
csa_transportation = csa_transportation.drop(csa_transportation.index[0])

print(filterlist(csa_transportation.columns))