// server/db.js
require('dotenv').config();
const mysql = require('mysql2/promise');
mysql://root:usigCHiwIQzWiEFxOHozgeccnGpcbCbh@autorack.proxy.rlwy.net:16521/railway

const connection  = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  port: process.env.PORT
});

// connection.connect((err) => {
//   if (err) {
//     console.error('Erro ao conectar ao banco de dados:', err.stack);
//     return;
//   }
//   console.log('Conectado ao banco de dados MySQL.');
// });

module.exports = connection;
