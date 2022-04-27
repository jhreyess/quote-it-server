var mysql = require('mysql');
const { promisify } = require('util')
require('dotenv').config

const conn = mysql.createConnection({
  host     : process.env.HOST,
  user     : process.env.USER,
  password : process.env.PASSWORD,
  database : process.env.DATABASE,
  port     : process.env.DB_PORT
})

conn.connect((e) => {
  var status = e ? "Connection Failed" : "Connection initialized... Listening for queries";
  console.log(`[mysql] ${status}`)
  if(e) console.log(e)
})

// Promisify queries
conn.query = promisify(conn.query)

module.exports = conn