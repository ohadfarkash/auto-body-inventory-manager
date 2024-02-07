import { db } from '~/server/utils/db'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    let num = body.num as string
    let name = body.name as string
    if (num || name){
        let res = await insertPart(num, name)
        console.log(res)
        return res
    }
    return undefined
})

async function insertPart(num: string, name: string){
    const text = `
    INSERT INTO public.part_name(part_num, name)
        VALUES ($1, $2)
        RETURNING id;
    `
    const res = await db.query(text, [num, name])
    return res.rows[0]
}