// lib/db.ts
import mysql from "mysql2/promise";

// Crée un pool de connexions réutilisable
const client = mysql.createPool({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_DATABASE,
	waitForConnections: true,
	connectionLimit: 10,
	queueLimit: 0,
});

// (Optionnel) DEBUG : vérifiez bien que vos variables sont chargées
console.log("→ DB_HOST =", process.env.DB_HOST);
console.log("→ DB_USER =", process.env.DB_USER);
console.log("→ DB_PASSWORD =", process.env.DB_PASSWORD ? "✓" : "✗ (vide)");
console.log("→ DB_DATABASE =", process.env.DB_DATABASE);

export default client;
