import { db } from '~/server/utils/db'

export default defineEventHandler(async (event) => {
    const query = getQuery(event)
    var locationIDs : number[] = []
    if (query.ro){
        locationIDs = await getLocationIDs(query.ro as number)
    }
    let locations = []
    for (let i = 0; i < locationIDs.length; i++) {
        let id = locationIDs[i]
        locations.push(await getFullLocation(id))
    }
    return locations
})

async function getLocationIDs(ro: number){
    const text = `
    SELECT id, ro_number, location_id
    FROM public.repair_order
    WHERE ro_number = $1;
    `
    const res = await db.query(text, [ro])
    let models = res.rows.map(v=>v.location_id) as number[]
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