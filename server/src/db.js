const mysql2 = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

const pool = mysql2.createPool({
	database: process.env.DATABASE || "test",
	port: process.env.DB_PORT || 3306,
	host: process.env.DB_HOST || "127.0.0.1",
	user: process.env.DB_USER || "user",
	password: process.env.DB_PASSWORD || "password",
	connectionLimit: 10
});

const promisePool = pool.promise();

promisePool.getConnection()
.then(conn => {
	console.log("[SUCCESS] DATABASE online");
	return conn;
})
.catch(err => {
	console.error("[ERROR]", err);
})

module.exports = promisePool;