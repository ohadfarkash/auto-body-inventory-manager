--Order of result is high to low level, where last row is the root
WITH RECURSIVE full_location AS (
	SELECT
		id,
		location_id,
		prefix,
		index,
		name
	FROM
		location
	WHERE
		id = 7
	UNION
	SELECT
		l.id,
		l.location_id,
		l.prefix,
		l.index,
		l.name
	FROM
		location l
	INNER JOIN full_location fl ON l.id = fl.location_id
)
SELECT * FROM full_location