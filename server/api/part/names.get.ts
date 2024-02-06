import { db } from '~/server/utils/db'

export default defineEventHandler(async (event) => {
    const query = getQuery(event)
    var parts :any[] = []
    if (query.num || query.name){
        parts = await getPartsBySimilarity(query.num as string, query.name as string)
    }
    return parts
})

async function getPartsBySimilarity(num: string, name: string){
    const text = `
    SELECT 
        pn.id, pn.part_num, pn.name, (similarity($1, part_num) + similarity($2, name)) / 2 as sim,
        SUM(coalesce(pl.qty, 0)) as qty
    FROM part_name pn
    LEFT JOIN part_location pl
        ON pn.id = pl.part_id
    GROUP BY pn.id
    ORDER BY sim DESC
    LIMIT 20
    `
    const res = await db.query(text, [num, name])
    let models = res.rows
    return models
}