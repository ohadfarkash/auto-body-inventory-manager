import { db } from '../utils/db'

export default defineEventHandler(async (event) => {
    const query = getQuery(event)
    return await getFullLocation(query.id as number)
})

async function getFullLocation(id: number) {
    let sql = `
    WITH RECURSIVE full_location AS (
        SELECT
            id,
            location_id,
            prefix,
            index,
            name
        FROM
            public.location
        WHERE
            id = $1
        UNION
        SELECT
            l.id,
            l.location_id,
            l.prefix,
            l.index,
            l.name
        FROM
            public.location l
        INNER JOIN full_location fl ON l.id = fl.location_id
    )
    SELECT * FROM full_location;
    `

    const res = await db.query(sql, [id])
    let models = res.rows.reverse()
    return models
}