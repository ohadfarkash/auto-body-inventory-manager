DO $$
DECLARE
	v_s INT := 2;
	v_c INT := 3;
	v_r INT := 3;
BEGIN
INSERT INTO public.location(location_id, prefix, index, name, code)
VALUES (
	(SELECT id
		FROM public.location
		WHERE prefix = 'C' AND index = v_c
		AND location_id in (
			SELECT id
			FROM public.location
			WHERE prefix = 'S' AND index = v_s
		)),
	'R',
	v_r,
	format('Row %s', v_r),
	format('S0%s-C0%s-R0%s', v_s, v_c, v_r)
);
END $$;