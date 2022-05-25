import jwt from 'jsonwebtoken'
import db from '../database/db.js'

const protect = (req, res, next) => {
  let token
  console.log(req.headers)

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1]
      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      console.log(decoded)
      const query = `SELECT * FROM user WHERE id = ${decoded.id}`
      db.getConnection((error, connection) => {
        if (error) {
          throw error
        }
        connection.query(query, (err, rows) => {
          connection.release()
          if (!err) {
            console.log(rows)
            req.name = rows[0].name
            req.email = rows[0].email
            next()
          } else {
            console.log(err)
          }
        })
      })
    } catch (error) {
      console.error(error)
      res.status(401)
      throw new Error('Not authorized, token failed')
    }
  }
}

export { protect }
