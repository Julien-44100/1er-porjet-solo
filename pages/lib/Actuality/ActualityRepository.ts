// lib/ActualityRepository.ts
import type { ResultSetHeader } from "mysql2";
import client from "../../lib/db";

// ajustez le chemin si besoin
import type { Actuality } from "./ActualyType";

export class ActualityRepository {
	/** Crée une actualité et retourne son ID */
	async create(data: Omit<Actuality, "id" | "createdAt">): Promise<number> {
		const [result] = await client.query<ResultSetHeader>(
			`INSERT INTO actuality (name_actuality, add_photo, description_actuality)
       VALUES (?, ?, ?)`,
			[data.name_actuality, data.add_photo, data.description_actuality],
		);
		return result.insertId;
	}

	/** Met à jour une actualité existante, retourne le nombre de lignes affectées */
	async update(
		id: number,
		data: Partial<Omit<Actuality, "id" | "createdAt">>,
	): Promise<number> {
		const [result] = await client.query<ResultSetHeader>(
			`UPDATE actuality
         SET name_actuality    = ?,
             add_photo         = ?,
             description_actuality = ?
       WHERE id = ?`,
			[data.name_actuality, data.add_photo, data.description_actuality, id],
		);
		return result.affectedRows;
	}
}

export default new ActualityRepository();
