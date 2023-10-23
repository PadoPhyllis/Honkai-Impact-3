const mysql = require('mysql')
const db = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '1624795809',
    database: 'my_db_01'
})

module.exports = db