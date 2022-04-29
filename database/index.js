var mysql = require('mysql');
require('dotenv').config

const pool = mysql.createPool(process.env.DATABASE_URL)

pool.getConnection((e, conn) => {
  if(e){
    if(e.code === 'PROTOCOL_CONNECTION_LOST'){
      console.log("[mysql] Connection Lost!")
    }else if(e.code === 'ER_CON_COUNT_ERROR'){
      console.log("[mysql] Database has too many connections!")
    }else if(e. code === 'ECONNREFUSED'){
      console.log("[mysql] Connection refused!")
    }
  }
  console.log("[mysql] Get Connection called")
  if(conn){ conn.release() }
  console.log("[mysql] Connection initialized! Listening for queries...")
})

module.exports = pool