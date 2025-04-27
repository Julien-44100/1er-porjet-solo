// pages/api/add-actuality.ts
import type { NextApiRequest, NextApiResponse } from "next";
import addActualityRepository from "../../lib/AddActuality/ActualityRepository";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	if (req.method === "POST") {
		const { name_actuality, add_photo, actuality } = req.body;
		if (!name_actuality || !actuality) {
			return res
				.status(400)
				.json({ error: "name_actuality et actuality sont requis." });
		}
		try {
			const insertedId = await addActualityRepository.create({
				name_actuality,
				add_photo,
				actuality,
			});
			return res.status(201).json({ message: "Ajout réussi", id: insertedId });
		} catch (err) {
			console.error("Erreur insertion :", err);
			return res.status(500).json({ error: "Erreur serveur lors de l'ajout." });
		}
	}

	if (req.method === "GET") {
		try {
			const rows = await addActualityRepository.getAll(); // ou votre méthode get()
			return res.status(200).json(rows);
		} catch (err) {
			console.error("Erreur lecture :", err);
			return res
				.status(500)
				.json({ error: "Erreur serveur lors de la récupération." });
		}
	}

	res.setHeader("Allow", ["GET", "POST"]);
	res.status(405).end(`Method ${req.method} Not Allowed`);
}
