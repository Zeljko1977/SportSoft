import db from '../database/db.js'

const log = (name, email, akcija, podaci) => {
  const query = `INSERT INTO log (ime , email , akcija , podaci ) VALUES ( '${name}', '${email}', '${akcija}', '${JSON.stringify(
    podaci
  )}' ) `

  db.getConnection((err, connection) => {
    if (err) {
      throw err
    }
    connection.query(query, (err, rows) => {
      connection.release()
      if (!err) {
        console.log(rows)
      } else {
        console.log(err)
      }
    })
  })
}

export { log }
