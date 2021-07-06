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

    variable_profile = {"variables" : description_profile["variables"]}
    overall_profile = {"table" : description_profile["table"]}
    overall_profile.update(variable_profile)

    json_data = json.dumps(overall_profile, cls=NpEncoder, ensure_ascii=False)
    return json_data
