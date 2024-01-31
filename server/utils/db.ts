import pg from 'pg'

{
    const types = pg.types

    // integer
    types.setTypeParser(types.builtins.INT4, parseNumber)
    types.setTypeParser(types.builtins.DATE, v => {
        return v
    })
    types.setTypeParser(1182 as any, v => {
        v = v.substring(1, v.length - 1)
        return v.split(',')
    })

    function parseNumber(v: string) {
        return Number.parseInt(v)
    }
}

export const db = new pg.Pool({
    connectionString: process.env.DB_URL,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
    // ssl: {
    //     requestCert: true,
    //     rejectUnauthorized: process.env.NODE_ENV !== 'production'
    // }
})

export function sql(s: TemplateStringsArray, ...v: any): string {
    let out: string = ""
    s.forEach((s, i) => {
        Evaluate(s, v[i])
    });
    return out;

    function Evaluate(s: string, v: any) {
        // Handle the joining of compoents in an array
        if (Array.isArray(v)) {
            out += s
            v.forEach((v) => {
                Evaluate("", v)
            })
        }
        // String - Output with value
        else if (typeof v === "string") {
            out += s + v
        }
        // Number - Coerce to string and output with value
        // This would happen anyway, but for clarity's sake on what's happening here
        else if (typeof v === "number") {
            out += s + String(v)
        }
        // object, undefined, null, boolean - Don't output a value.
        else {
            out += s
        }
    }
}

var errorCodes : {[key: string]: string} = {
    '23505': `Duplicate Error! Can't add this more than once.`
}
export function readDBError(error: any){
    let desc = errorCodes[error.code]
    if (desc) {
        return desc
    } else {
        return 'Unknown Error! Change something and try again.'
    }
}