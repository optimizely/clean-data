-- account_executiv_id
select 
a.id,
a."name" ,
a."source" ,
a.account_executive_id as missing_account_executive_id, l.primary_account_executive_c  as found_account_executive_id
from ufdm.account a 
left join epi_marketo."lead" l on a.epi_universal_id = CASE  WHEN l.dynamics_id_c IS NULL THEN l.sf_guid_c ELSE l.dynamics_id_c  end
where a.account_executive_id  is null
order by  a."source"  asc;

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