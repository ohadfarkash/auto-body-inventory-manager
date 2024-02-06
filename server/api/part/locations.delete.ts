import { db, readDBError } from '~/server/utils/db'
import { LocationOps } from '~/server/utils/location'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    let part_id = body.part_id as number
    let location_code = body.location as string
    location_code = location_code.trim()
    let location = await LocationOps.getFromCode(location_code)
    if (location) {
        try {
            var res = await deletePartLocation(part_id, location.id)
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

async function deletePartLocation(part_id: number, location_id: number) {
    let sql = `
    DELETE FROM public.part_location
    WHERE part_id = $1 AND location_id = $2
    `
    const res = await db.query(sql, [part_id, location_id])
    let models = res.rows
    return res
}