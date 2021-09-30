var mysql = require('mysql');
require('dotenv').config()

var conn = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
})

conn.connect(() => {
    console.log(`database connected....`)
})

module.exports = conn;