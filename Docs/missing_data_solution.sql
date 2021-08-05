-- account_executiv_id -----------MODIFY ------------------
select 
a.id,
a."name" ,
a."source" ,
a.account_executive_id  as missing_account_executive,
ssa.team_member_1_c  as found_account_executive_ID_FOPTI,
l.primary_account_executive_c  as found_account_executive_id_FEPI
from ufdm.account a 
left join public.snapshot_sf_account ssa on ssa.id = a.id 
left join epi_marketo."lead" l on a.epi_universal_id = CASE  WHEN l.dynamics_id_c IS NULL THEN l.sf_guid_c ELSE l.dynamics_id_c  end
where account_executive_id  is null 
and ssa.team_member_1_c  is not null 
or l.primary_account_executive_c  is not null 

-- website
select 
a.id,
a."name" ,
a."source" ,a.website as missing_website , l.website  as website_found
from ufdm.account a 
left join epi_marketo."lead" l on a.epi_universal_id = CASE  WHEN l.dynamics_id_c IS NULL THEN l.sf_guid_c ELSE l.dynamics_id_c  end
where a.website  is null
order by  a."source"  asc;


--customer stage 
select 
a.id,
a."name" ,
a."source" ,a.customer_stage as missing_customer_stage , l.website  as customer_stage_c_found
from ufdm.account a 
left join epi_marketo."lead" l on a.epi_universal_id = CASE  WHEN l.dynamics_id_c IS NULL THEN l.sf_guid_c ELSE l.dynamics_id_c  end
where a.customer_stage   is null
order by  a."source"  asc;


-- billing_country
select a.id,
       a."name",
       a."source",
       a.billing_country as missing_billing_country, 
       ec."name" as billing_country_found
from ufdm.account a 
left join epi_netsuite_2021_07_13.customers c on c.master_customer_id = a.epi_universal_id
left join epi_netsuite_2021_07_13.billing_accounts ba on ba.customer_id = c.customer_id 
left join epi_netsuite_2021_07_13.address_book ab on ab.address_book_id = ba.bill_to_address_book_id 
left join epi_netsuite_2021_07_13.countries ec on ec.short_name = ab.country 
where a.billing_country is null
group by a.id, ec."name" 

-- billing_city
select a.id,
       a."name",
       a."source",
       a.billing_city as missing_billing_city, 
       ab.city as billing_city_found
from ufdm.account a 
left join epi_netsuite_2021_07_13.customers c on c.master_customer_id = a.epi_universal_id
left join epi_netsuite_2021_07_13.billing_accounts ba on ba.customer_id = c.customer_id 
left join epi_netsuite_2021_07_13.address_book ab on ab.address_book_id = ba.bill_to_address_book_id 
where a.billing_city is null

-- billing_state
select a.id,
       a."name",
       a."source",
       a.billing_state as missing_billing_state, 
       ab.state as billing_state_found
from ufdm.account a 
left join epi_netsuite_2021_07_13.customers c on c.master_customer_id = a.epi_universal_id
left join epi_netsuite_2021_07_13.billing_accounts ba on ba.customer_id = c.customer_id 
left join epi_netsuite_2021_07_13.address_book ab on ab.address_book_id = ba.bill_to_address_book_id 
where a.billing_state is null

-- billing_postal_code 
select a.id,
       a."name",
       a."source",
       a.billing_postal_code as missing_billing_postal_code, 
       ab.zip as billing_postal_code_found
from ufdm.account a 
left join epi_netsuite_2021_07_13.customers c on c.master_customer_id = a.epi_universal_id and a.name = c.name
left join epi_netsuite_2021_07_13.billing_accounts ba on ba.customer_id = c.customer_id 
left join epi_netsuite_2021_07_13.address_book ab on ab.address_book_id = ba.bill_to_address_book_id 
where a.billing_postal_code is null

--- primary_market
select a.id,
       a."name",
       a."source",
       a.primary_market as missing_primary_market, 
       l.epi_primary_market_c as primary_market_found
from ufdm.account a 
left join epi_marketo."lead" l on a.epi_universal_id = CASE 
													        WHEN l.dynamics_id_c IS NULL THEN l.sf_guid_c ELSE l.dynamics_id_c 
													    END
where a.primary_market is null

-- revenue
select a.id,
       a."name",
       a."source",
       a.revenue as missing_revenue,
       l.annual_revenue as revenue_found
from ufdm.account a 
left join epi_marketo."lead" l on a.epi_universal_id = CASE 
													        WHEN l.dynamics_id_c IS NULL THEN l.sf_guid_c ELSE l.dynamics_id_c 
													    end
left join epi_netsuite_2021_07_13.companies c on c.master_customer_id = a.epi_universal_id 
where a.revenue is null

-- number_of_employees 
select a.id,
       a."name",
       a."source",
       a.number_of_employees as missing_number_of_employees,
       l.number_of_employees as number_of_employees_found
from ufdm.account a 
left join epi_marketo."lead" l on a.epi_universal_id = CASE 
													        WHEN l.dynamics_id_c IS NULL THEN l.sf_guid_c ELSE l.dynamics_id_c 
													    end
left join epi_netsuite_2021_07_13.companies c on c.master_customer_id = a.epi_universal_id 
where a.number_of_employees is null

-- owner id

select

a.id,

a."name" ,

a."source" ,

a.owner_id  as missing_owner_id, l.sfdc_lead_owner_id as found_ownerid

from ufdm.account a

left join epi_marketo."lead" l on a.epi_universal_id = CASE  WHEN l.dynamics_id_c IS NULL THEN l.sf_guid_c ELSE l.dynamics_id_c  end

where a.owner_id  is null;


-- territory
 
select

a.id,

a."name" ,

a."source" ,

a.territory as missing_territory, l.territory_text_c as found_territory

from ufdm.account a

left join epi_marketo."lead" l on a.epi_universal_id = CASE  WHEN l.dynamics_id_c IS NULL THEN l.sf_guid_c ELSE l.dynamics_id_c  end

where a.territory  is null;

-- CONTRAC START DATE
select a.id, a."name", a."source", 

 a.contract_start_date, min(bs.date_start) as netsuite_start_date

from ufdm.account a

left join epi_netsuite_2021_07_13.customers c on a.epi_universal_id = c.master_customer_id

left join epi_netsuite_2021_07_13.billing_accounts ba on c.customer_id = ba.customer_id

left join epi_netsuite_2021_07_13.billing_subscriptions bs on bs.billing_account_id = ba.billing_account_id

where a.contract_start_date is null

group by 1,2,3,4

order by a.epi_universal_id


 
-- CONTRAC END DATE
 

select a.id, a."name", a."source", 

 a.contract_end_date , max(bs.date_end) as netsuite_end_date

from ufdm.account a

left join epi_netsuite_2021_07_13.customers c on a.epi_universal_id = c.master_customer_id

left join epi_netsuite_2021_07_13.billing_accounts ba on c.customer_id = ba.customer_id

left join epi_netsuite_2021_07_13.billing_subscriptions bs on bs.billing_account_id = ba.billing_account_id

where a.contract_start_date is null

group by 1,2,3,4

order by a.epi_universal_id


-- latest_mql_date
select 
a.id,
a."name" ,
a."source" ,
a.latest_mql_date as missing_latest_mql_date, l.date_latest_mql_c  as found_latest_mql
from ufdm.account a 
left join epi_marketo."lead" l on a.epi_universal_id = CASE  WHEN l.dynamics_id_c IS NULL THEN l.sf_guid_c ELSE l.dynamics_id_c  end
where a.latest_mql_date is null
order by  l.date_latest_mql_c asc;

--renewal
select 
a.id,
a."name" ,
a."source" ,
a.renewal_date  as missing_renewal_date, l.renewal_date_c  as found_renewal_date
from ufdm.account a 
left join epi_marketo."lead" l on a.epi_universal_id = CASE  WHEN l.dynamics_id_c IS NULL THEN l.sf_guid_c ELSE l.dynamics_id_c  end
where a.renewal_date is null
order by l.renewal_date_c ;


--Product
select 
a.id,
a."name" ,
a."source" ,
a.product as missing_product, 
string_agg(i.displayname, ', ' ) as found_product
from epi_netsuite_2021_07_13.billing_accounts ba 
left join epi_netsuite_2021_07_13.billing_subscriptions bs on bs.billing_account_id = ba.billing_account_id  and bs."_fivetran_deleted"  is distinct from true 
left join epi_netsuite_2021_07_13.billing_subscription_lines bsl on bsl.subscription_id  = bs.subscription_id  and bsl."_fivetran_deleted" is distinct  from true
left join epi_netsuite_2021_07_13.companies c  on c.company_id  = ba.customer_id  and c."_fivetran_deleted"  is distinct from  true
left join epi_netsuite_2021_07_13.items i on i.item_id  = bsl.item_id  and i."_fivetran_deleted"  is distinct from true
right join ufdm.account a on a.epi_universal_id  = c.master_customer_id 
where a.product is null
group by 1,2,3,4;

--skus
select 
a.id,
a."name" ,
a."source" ,
a.skus as missing_skus, 
string_agg(i."name" , ', ' ) as found_skus
from epi_netsuite_2021_07_13.billing_accounts ba 
left join epi_netsuite_2021_07_13.billing_subscriptions bs on bs.billing_account_id = ba.billing_account_id  and bs."_fivetran_deleted"  is distinct from true 
left join epi_netsuite_2021_07_13.billing_subscription_lines bsl on bsl.subscription_id  = bs.subscription_id  and bsl."_fivetran_deleted" is distinct  from true
left join epi_netsuite_2021_07_13.companies c  on c.company_id  = ba.customer_id  and c."_fivetran_deleted"  is distinct from  true
left join epi_netsuite_2021_07_13.items i on i.item_id  = bsl.item_id  and i."_fivetran_deleted"  is distinct from true
left join ufdm.account a on a.epi_universal_id  = c.master_customer_id 
where a.product is null
group by 1,2,3,4;

--duns id

select 
a.id,
a."name" ,
a."source" ,
a.duns_id as missing_duns_id,
spsa.d_u_n_s_number_c
from ufdm.account a 
left join public.star_product_salesforce_account spsa  on spsa.id = a.id 
where a.duns_id  is null
order by spsa.d_u_n_s_number_c asc


--naics
select 
a.id,
a."name" ,
a."source" ,
a.naics as missing_naics,
spsa.primary_naics_code_c,
csa.primary_naics_code 
from ufdm.account a 
left join public.star_product_salesforce_account spsa  on spsa.id = a.id
left join public.cust_sf_account csa on csa.account_id  = a.id 
where csa.primary_naics_code  is not null and a.naics is null

--sic
select 
a.id,
a."name" ,
a."source" ,
a.sic as missing_naics,
spsa.sic 
from ufdm.account a 
left join public.star_product_salesforce_account spsa  on spsa.id = a.id
where spsa.sic is not null and a.sic is null



--  REGION
select 
a.id,
a."name" ,
a."source" ,
a.region  as missing_region,
case 
when dar.ultimate_parent_account_territory_c  LIKE '%NA%' THEN 'North America'
when dar.ultimate_parent_account_territory_c  LIKE '%EMEA%' THEN 'EMEA'
when dar.ultimate_parent_account_territory_c  LIKE '%ANZ%' THEN 'APAC'
else null
end as region_founded_FOPTI,
case
 when l.account_territory_c  like  '%NA%' THEN 'North America'
 when l.account_territory_c  like  '%North%America%' THEN 'North America'
 when l.account_territory_c  like '%EMEA%' THEN 'EMEA'
 when l.account_territory_c  like '%Europe%' THEN 'EMEA'
 when l.account_territory_c  like  '%Sweden%' THEN 'EMEA'
 when l.account_territory_c  like  '%UK%' THEN 'EMEA'
 when l.account_territory_c  like '%ANZ%' THEN 'APAC'
 when l.account_territory_c  like  '%APJ%' THEN 'APAC'
 when l.account_territory_c  like  '%DACH%' THEN 'DACH'
        ELSE null
  end as region_founded_fepi
from ufdm.account a 
left join derived_account_rollup dar on dar.account_id  = a.id 
left join epi_marketo."lead" l on a.epi_universal_id = CASE  WHEN l.dynamics_id_c IS NULL THEN l.sf_guid_c ELSE l.dynamics_id_c  end
where a.region is null 
and l.account_territory_c  is not null 
or dar.ultimate_parent_account_territory_c  is not null;

-- Target account
select 
a.id,
a."name" ,
a."source" ,
a.target_account  as missingg_target_account,
l.sfdc_type as Found_target_account
from ufdm.account a 
left join epi_marketo."lead" l on a.epi_universal_id = CASE  WHEN l.dynamics_id_c IS NULL THEN l.sf_guid_c ELSE l.dynamics_id_c  end
where a.target_account is null
and l.sfdc_type is not null 


-- NEW SOLUTIONS NOT IN THE PLATFORM


















