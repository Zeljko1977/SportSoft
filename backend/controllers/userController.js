import bcrypt from 'bcryptjs'
import db from '../database/db.js'
import generateToken from '../utils/generateToken.js'
const saltRounds = 10
import { log } from '../middleware/logFunkcija.js'

const registerUser = (req, res) => {
  const { name, email, password } = req.body

  bcrypt.hash(password, saltRounds, (err, hash) => {
    const mess = `SELECT * from user WHERE email = '${email}'`

    db.getConnection((err, connection) => {
      if (err) {
        throw err
      }

      connection.query(mess, (err, rows) => {
        if (!err) {
          if (!rows.length) {
            const query = `INSERT INTO user (name, email, password) VALUES ('${name}', '${email}', '${hash}')`
            connection.query(query, (err, rows) => {
              connection.release()
              if (!err) {
                log(name, email, 'REGISTER', { name, email })
                res.send(rows)
              } else {
                console.log(err)
              }
            })
          } else {
            return res.send('Već postoji korisnik sa ovim email-om !!!')
          }
        } else {
          console.log(err)
        }
      })
    })
  })
}

const userLogin = (req, res) => {
  const { email, password } = req.body

  //const { name } = req

  const query = `SELECT * FROM user WHERE email = '${email}'`
  db.getConnection((err, connection) => {
    if (err) {
      throw err
    }
    connection.query(query, (err, rows) => {
      connection.release()
      if (!err) {
        bcrypt.compare(password, rows[0].password, (error, response) => {
          if (response) {
            const id = rows[0].id
            log('Korisnik se uspešno loginovao...', email, 'LOGIN', { email })
            res.send({ data: rows, token: generateToken(id) })
          } else {
            res.send({ message: 'Wrong username/password combination !' })
          }
        })
      } else {
        console.log(err)
      }
    })
  })
}

const getAllUsers = (req, res) => {
  console.log(req.query.uloga)
  const uloga = req.query.uloga
  const idVlasnik = req.query.idVlasnik
  console.log(idVlasnik)
  const tabela = uloga == 'igrac' ? 'trener_igrac' : 'klub_trener'
  const kolona = uloga == 'igrac' ? 'TrenerId' : 'KlubId'
  const selKolona = uloga == 'igrac' ? 'IgracId' : 'TrenerId'
  const { name, email } = req
  let query
  if (idVlasnik != 0) {
    query = `SELECT * FROM user WHERE id IN (SELECT ${selKolona} FROM ${tabela} WHERE ${kolona} = '${idVlasnik}')`
  } else {
    query = `SELECT * FROM user WHERE uloga = '${uloga}'`
  }
  console.log(query)

  db.getConnection((error, connection) => {
    if (error) {
      throw error
    }
    connection.query(query, (err, rows) => {
      connection.release()
      if (!err) {
        log(name, email, 'GET ALL USERS', rows)
        res.send(rows)
      }
    })
  })
}

const getSingleUser = (req, res) => {
  const id = req.params.id

  const { name, email } = req

  const query = `SELECT name, email, uloga FROM user WHERE id = ${id}`

  db.getConnection((error, connection) => {
    if (error) {
      throw error
    }
    connection.query(query, (err, rows) => {
      connection.release()
      if (!err) {
        log(name, email, 'GET SINGLE USER', rows)
        res.send(rows)
      } else {
        console.log(err)
      }
    })
  })
}

const updateUser = (req, res) => {
  const { podaci, id } = req.body

  const { name, email } = req

  const query = `UPDATE user SET name = '${podaci.ime}', email = '${podaci.email}', uloga = '${podaci.uloga}' WHERE id = ${id}`

  db.getConnection((error, connection) => {
    if (error) {
      throw error
    }
    connection.query(query, (err, rows) => {
      connection.release()
      if (!err) {
        log(name, email, 'UPDATE USER', req.body)
        res.send(rows)
      } else {
        console.log(err)
      }
    })
  })
}

export { registerUser, userLogin, getAllUsers, getSingleUser, updateUser }
