const mysql = require('mysql');
const conn = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'mag123ato',
	database: 'api',
	port: '3366'
});

conn.connect();

module.exports = conn;