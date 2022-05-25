import dbSql from './db.js'

const queryPromise = (query) => {
  return new Promise((resolve, reject) => {
    dbSql.query(query, (error, results) => {
      if (error) {
        return reject(error)
      }
      return resolve(results)
    })
  })
}

export default queryPromise
