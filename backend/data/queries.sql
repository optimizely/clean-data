--Dinamyc 
select a.id, 
 a.name,
 a.source,
 a.{column} as missing_{column},
 NULL as {column}_found
 from ufdm.account a
 where a.{column} is null;