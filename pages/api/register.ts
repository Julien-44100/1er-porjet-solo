// pages/api/register.ts
import type { NextApiRequest, NextApiResponse } from "next";
import argon2 from "argon2";
import { createConnection } from "../lib/db";

type MySqlError = Error & { code?: string };

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	if (req.method !== "POST") {
		return res.status(405).json({ error: "Méthode non autorisée" });
	}

	const { email, password } = req.body;
	if (!email || !password) {
		return res.status(400).json({ error: "Email et mot de passe requis" });
	}

	try {
		const hashedPassword = await argon2.hash(password);
		const connection = await createConnection();

		await connection.execute(
			"INSERT INTO users (email, password) VALUES (?, ?)",
			[email, hashedPassword],
		);
		await connection.end();

		return res.status(201).json({ message: "Utilisateur créé avec succès" });
	} catch (error: unknown) {
		const err = error as MySqlError;
		if (err.code === "ER_DUP_ENTRY") {
			return res.status(409).json({ error: "Cet email est déjà utilisé" });
		}
		console.error("Erreur SQL :", err);
		return res.status(500).json({ error: "Erreur interne du serveur" });
	}
}
