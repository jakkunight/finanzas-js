// Instancia de conector a MySQL/MariaDB:
const mysql2 = require('mysql2');

// Configuración:
const dotenv = require('dotenv');
dotenv.config();

const pool = mysql2.createPool({
	database: process.env.DATABASE || "test",
	host: process.env.DB_HOST || "localhost",
	port: process.env.DB_PORT || "3306",
	user: process.env.DB_USER || "user",
	password: process.env.DB_PASSWORD || "password"
});

pool.getConnection((err, conn) => {
	if(err){
		console.error(err);
		return;
	}
	console.log("[SUCCESS] DATABASE online.");
	return conn;
});

const promisePool = pool.promise();

module.exports = promisePool;