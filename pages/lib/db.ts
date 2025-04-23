// lib/db.ts  (à la racine du projet, pas dans pages/)
import mysql from "mysql2/promise";

export async function createConnection() {
	// DEBUG : vérifiez bien que vos variables sont chargées
	console.log("→ DB_HOST =", process.env.DB_HOST);
	console.log("→ DB_USER =", process.env.DB_USER);
	console.log("→ DB_PASSWORD =", process.env.DB_PASSWORD ? "✓" : "✗ (vide)");
	console.log("→ DB_DATABASE =", process.env.DB_DATABASE);

	return await mysql.createConnection({
		host: process.env.DB_HOST,
		user: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_DATABASE,
	});
}
