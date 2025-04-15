import type { NextApiRequest, NextApiResponse } from "next";
import argon2 from "argon2";
import { createConnection } from "../lib/db"; // Remplacez par le chemin correct si nécessaire

// Définition d'un type d'erreur MySQL étendant l'interface Error
type MySqlError = Error & {
	code?: string;
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	if (req.method !== "POST") {
		return res.status(405).json({ error: "Méthode non autorisée" });
	}

	const { email, password } = req.body;

	// 1) Vérifier que les champs email et password sont fournis
	if (!email || !password) {
		return res.status(400).json({ error: "Email et mot de passe requis" });
	}

	try {
		// 2) Hasher le mot de passe avec Argon2 (Argon2 gère automatiquement un sel sécurisé)
		const hashedPassword = await argon2.hash(password);

		// 3) Se connecter à la base de données
		const connection = await createConnection();

		// 4) Insérer l’utilisateur
		await connection.execute(
			"INSERT INTO users (email, password) VALUES (?, ?)",
			[email, hashedPassword],
		);

		// Fermer la connexion
		await connection.end();

		return res.status(201).json({ message: "Utilisateur créé avec succès" });
	} catch (error: unknown) {
		// On cast l'erreur pour pouvoir accéder à `code`
		const err = error as MySqlError;

		// Gestion du cas où l'email est déjà utilisé (contrainte UNIQUE violée)
		if (err.code === "ER_DUP_ENTRY") {
			return res.status(409).json({ error: "Cet email est déjà utilisé" });
		}

		console.error(err);
		return res.status(500).json({ error: "Erreur interne du serveur" });
	}
}
