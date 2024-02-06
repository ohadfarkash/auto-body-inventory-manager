import { db } from '~/server/utils/db'

export default defineEventHandler(async (event) => {
    const query = getQuery(event)
    var part: any = {}
    if (query.id){
        part = await getPartByID(query.id as number)
    }
    return part
})

async function getPartByID(id: number){
    const text = `
    SELECT id, part_num, name
    FROM public.part_name
    WHERE id = $1
    `
    const res = await db.query(text, [id])
    let models = res.rows[0]
    return models
}