// server/db.js
require('dotenv').config();
const mysql = require('mysql2/promise');

const connection  = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
});

// connection.connect((err) => {
//   if (err) {
//     console.error('Erro ao conectar ao banco de dados:', err.stack);
//     return;
//   }
//   console.log('Conectado ao banco de dados MySQL.');
// });

module.exports = connection;
