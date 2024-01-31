function parseLocationID(id: string) {
    const locations = []
    const regex = /[a-z][0-9]+/gi
    const pairs = id.match(regex) || []
    for (const pair of pairs) {
        let prefix = pair.substring(0, 1).toLocaleUpperCase()
        let index = parseInt(pair.substring(1))
        locations.push({
            prefix,
            index
        })
    }
    return locations
}

function assembleQuery(location_verbs: { prefix: string, index: number }[]) {
    let sql = ''
    location_verbs.forEach((location, i) => {
        let stack = `
        SELECT ${(i == location_verbs.length - 1) ? '*' : 'id'}
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

async function getFromCode(location_code: string) {
    let verbs = parseLocationID(location_code)
    console.log(verbs)
    let sql = assembleQuery(verbs)
    return await getLocation(sql)
}

export const LocationOps = {
    getFromCode
}