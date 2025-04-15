import mysql from "mysql2/promise";

// Variables d'environnement avec valeurs par défaut
const DB_HOST = process.env.DB_HOST || "localhost";
const DB_USER = process.env.DB_USER || "root";
const DB_PASSWORD = process.env.DB_PASSWORD || "";
const DB_DATABASE = process.env.DB_DATABASE || "my_app_db";

// Fonction de création de connexion
export async function createConnection() {
	// Création de la connexion MySQL
	const connection = await mysql.createConnection({
		host: DB_HOST,
		user: DB_USER,
		password: DB_PASSWORD,
		database: DB_DATABASE,
	});

	// Retourne l'objet connexion
	return connection;
}
