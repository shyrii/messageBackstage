const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('user.sqlite')
const crypto = require('crypto')

db.on('trace',(e)=>{
    console.log(e)
})

const md5 = (str) => {
    const hash = crypto.createHash('md5')
    hash.update(str)
    return hash.digest('hex')
}

const allPromise = (sql,param) => new Promise((resolve,reject) => {
    db.all(sql,param,(err,rows) => {
        if(err) {
            reject(err)
        }
        resolve(rows)
    })
})

const runPromise = (sql,param) => new Promise((resolve,reject) => {
    db.all(sql,param,(err,rows) => {
        if(err) {
            reject(err)
        }
        resolve(rows)
    })
})

module.exports= {
    allPromise,
    runPromise,
    md5
}