import { db } from '~/server/utils/db'

export default defineEventHandler(async (event) => {
    const query = getQuery(event)
    var locations :any[] = []
    if (query.id){
        var locationIds = await getPartLocationIds(query.id as number)
        
        for (let i = 0; i < locationIds.length; i++) {
            let id = locationIds[i].location_id
            locations.push({...await getFullLocation(id), qty:locationIds[i].qty})
        }
    }
    return locations
})

async function getPartLocationIds(part_id: number){
    const text = `
    SELECT location_id, qty
    FROM part_location
    WHERE part_id = $1
    `
    const res = await db.query(text, [part_id])
    let models = res.rows
    return models
}

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
    let models = res.rows
    .reverse()
    .reduce(
        (accumulator, current, i) => {
            let islast = (i != res.rows.length - 1)
            if (current.prefix && current.index) {
                var id = current.prefix + current.index.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
                accumulator.id += id + (islast ? '-' : '')
            }
            accumulator.description += current.name + (islast ? '\n' : '')
            return accumulator
        },
        {
            id: "",
            description: ""
        }
    )
    return models
}