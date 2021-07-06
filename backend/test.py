
#%%
import pandas as pd
from pandas_profiling import ProfileReport 
from with_sql_session import remote_sql_session

df = pd.read_csv('/Users/glramirez/Documents/DQApp/account_202106241048.csv')

#%%
@remote_sql_session
def get_data(session):
    query = 'select a.duns_number_c, a.sic, a."name", a.website, a.owner_id, a.primary_account_executive_c, a.primary_customer_success_manager_c, a.number_of_employees, a.billing_country, a.billing_state, a.billing_city, a.billing_postal_code, a.parent_id, a.customer_stage_c, a.industry, a.epi_primary_market_c from salesforce_sandbox2.account a'
    df = pd.read_sql(query, session.bind)
    print(df.head())
    return df

#%%
df = get_data()
df_profile = ProfileReport(df,title='Sanbox Report', minimal=True)
df_profile.to_file('Sanbox_Report.html')

# %%
if 'id' in df.columns:
    df.drop(['id'], axis=1, inplace=True)

df_profile = ProfileReport(df, minimal=True)
json_data = df_profile.to_json()
# %%
description_data = df_profile.get_description()

for key in description_data['variables'].keys():
    description_data['variables'][key].pop('value_counts_without_nan', None)
    description_data['variables'][key].pop('value_counts_index_sorted', None)

# %%
import json
import numpy as np

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

with open('data.json', 'w') as f:
    json.dump(description_data['variables'], f, indent=4, cls=NpEncoder, ensure_ascii=False)


# %%
