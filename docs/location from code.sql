SELECT *
FROM public.location
WHERE prefix = 'R' AND index = 2
AND location_id in (
	SELECT id
	FROM public.location
	WHERE prefix = 'C' AND index = 2
	AND location_id in (
		SELECT id
		FROM public.location
		WHERE prefix = 'S' AND index = 1
	)
)