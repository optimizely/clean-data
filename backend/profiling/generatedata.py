from os import error
import pandas as pd
import json
import numpy as np
from pandas_profiling import ProfileReport


class NpEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, np.integer):
            return int(obj)
        elif isinstance(obj, np.floating):
            return float(obj)
        elif isinstance(obj, np.ndarray):
            return obj.tolist()
        elif isinstance(obj, np.bool_):
            return bool(obj)
        elif isinstance(obj, pd.Series):
            return obj.tolist()
        else:
            return super(NpEncoder, self).default(obj)

def generate_data(df):
    if 'id' in df.columns:
        df.drop(['id'], axis=1, inplace=True)
    df_profile = ProfileReport(df, minimal=True)
    description_profile = df_profile.get_description()
    for key in description_profile['variables'].keys():
        description_profile['variables'][key].pop('value_counts_without_nan', None)
        description_profile['variables'][key].pop('value_counts_index_sorted', None)

    column_list = ['epi_universal_id','parent_id','parent_name','skus','target_account','running_experiments','duns_id','naics','sic','region','territory','target_account']
    df_nullvalues = df.drop(columns=column_list, axis=1, errors='ignore')
    withnulls = df_nullvalues.isna().any(axis=1).sum()

    nulls = {
        "without_nulls": df.shape[0] - withnulls,
        "with_nulls": withnulls,
        "perc_nulls": round(withnulls/df.shape[0], 5)
    }

    variable_profile = {"variables" : description_profile["variables"]}
    overall_profile = {"table" : description_profile["table"]}
    overall_profile.update(variable_profile)
    overall_profile["table"].update(nulls)

    json_data = json.dumps(overall_profile, cls=NpEncoder, ensure_ascii=False)
    return json_data
