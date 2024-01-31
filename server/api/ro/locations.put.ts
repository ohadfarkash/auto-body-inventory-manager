import { db } from '~/server/utils/db'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const ro_number = body.ro as number
    const location_id = body.location as string
    const locations = parseLocationID(location_id)
    const sql = assembleQuery(locations)
    const location = await getLocation(sql)

    return insertRO(ro_number, location.id)
})


function parseLocationID(id: string) {
    const locations = []
    const regex = /[a-z][0-9]+/gi
    const pairs = id.match(regex) || []
    for (const pair of pairs) {
        let prefix = pair.substring(0, 1)
        let index = parseInt(pair.substring(1))
        locations.push({
            prefix,
            index
        })
    }
    return locations
}

function assembleQuery(locations: { prefix: string, index: number }[]) {
    let sql = ''
    locations.forEach((location, i) => {
        let stack = `
        SELECT ${(i == locations.length - 1) ? '*' : 'id'}
		FROM public.location
		WHERE prefix = '${location.prefix}' AND index = ${location.index}
        `
        if (sql) {
            stack += `
            AND location_id in (
                ${sql}
            )
            `
        }
        sql = stack
    })
    return sql
}

async function getLocation(sql: string) {
    const res = await db.query(sql)
    let models = res.rows[0]
    return models
}

async function insertRO(ro:number, location_id: number){
    let sql = `
    INSERT INTO public.repair_order (ro_number, location_id)
    VALUES ($1, $2)
    `
    const res = await db.query(sql, [ro, location_id])
    let models = res.rows
    return res
}