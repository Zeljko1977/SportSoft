import mysql from 'mysql'

const db = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'katapult',
  port: '3306',
  multipleStatements: true,
})

export default db // export the pools getConnection
