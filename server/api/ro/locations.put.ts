import { db, readDBError } from '~/server/utils/db'
import { LocationOps } from '~/server/utils/location'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    let ro_number = body.ro as number
    let location_code = body.location as string
    location_code = location_code.trim()
    let location = await LocationOps.getFromCode(location_code)
    if (location) {
        try {
            var res = await insertRO(ro_number, location.id)
        } catch (error: any) {
            console.error(error)
            throw createError({
                statusCode: 400,
                statusMessage: readDBError(error),
            })
        }
        return res
    } else {
        throw createError({
            statusCode: 400,
            statusMessage: `Invalid location! Please check the location code to make sure it's right.`,
        })
    }
})

async function insertRO(ro: number, location_id: number) {
    let sql = `
    INSERT INTO public.repair_order (ro_number, location_id)
    VALUES ($1, $2)
    `
    const res = await db.query(sql, [ro, location_id])
    let models = res.rows
    return res
}