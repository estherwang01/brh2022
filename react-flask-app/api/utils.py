import pandas as pd 

def get_dfs_from_csv():
  grids_pth = "../../data/grids.csv"
  zipcodes_pth = "../../data/zipcodes.csv"
  grids_df = pd.read_csv(grids_pth)
  zipcodes_df = pd.read_csv(zipcodes_df)
  return grids_df, zipcodes_df

def process_zipcode(zipcode, grids_df, zipcodes_df):
  pass