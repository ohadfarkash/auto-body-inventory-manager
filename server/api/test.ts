import { db } from '../utils/db'

export default defineEventHandler(async (event) => {
    return await getFullLocation()
})

async function getFullLocation() {
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
            id = 7
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

    const res = await db.query(sql)
    let models = res.rows
    return models
}