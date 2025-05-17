import type { Request, Response } from "express";
import ActualityRepository from "./ActualityRepository";

export const addActuality = async (req: Request, res: Response) => {
	try {
		const { name_actuality, add_photo, description_actuality } = req.body;

		if (!name_actuality || !add_photo || !description_actuality) {
			return res.status(400).json({ error: "Tous les champs sont requis." });
		}

		const newId = await ActualityRepository.create({
			name_actuality,
			add_photo,
			description_actuality,
		});

		return res
			.status(201)
			.json({ message: `Actualité créée avec l'ID ${newId}.` });
	} catch (err) {
		console.error("Erreur lors de l'ajout de l'actualité :", err);
		return res.status(500).json({ error: "Erreur serveur lors de l'ajout." });
	}
};

export const editActuality = async (req: Request, res: Response) => {
	try {
		const id = Number(req.params.id);
		const { name_actuality, add_photo, description_actuality } = req.body;

		if (!name_actuality || !add_photo || !description_actuality) {
			return res.status(400).json({ error: "Tous les champs sont requis." });
		}

		const affected = await ActualityRepository.update(id, {
			name_actuality,
			add_photo,
			description_actuality,
		});

		if (affected === 0) {
			return res.status(404).json({ error: "Actualité non trouvée." });
		}

		return res
			.status(200)
			.json({ message: `Actualité "${name_actuality}" mise à jour.` });
	} catch (err) {
		console.error("Erreur lors de la mise à jour de l'actualité :", err);
		return res
			.status(500)
			.json({ error: "Erreur serveur lors de la mise à jour." });
	}
};
