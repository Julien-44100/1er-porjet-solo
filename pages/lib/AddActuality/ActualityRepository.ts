// lib/AddActuality/ActualityRepository.ts
import type { RowDataPacket, ResultSetHeader } from "mysql2";
import client from "../../lib/db";
import type { addactuality } from "./AddActuality";

interface ActualityRow {
	id: number;
	name_actuality: string;
	add_photo: string | null;
	actuality: string;
	createdAt: Date; // ou `string` suivant votre base
}

class AddActualityRepository {
	async create(data: addactuality): Promise<number> {
		const [result] = await client.query<ResultSetHeader>(
			"INSERT INTO add_actuality (name_actuality, add_photo, actuality) VALUES (?, ?, ?)",
			[data.name_actuality, data.add_photo, data.actuality],
		);
		return result.insertId;
	}

	async getAll(): Promise<ActualityRow[]> {
		// 1) on demande un RowDataPacket[] à mysql2
		const [rows] = await client.query<RowDataPacket[]>(
			"SELECT * FROM add_actuality ORDER BY id DESC",
		);

		// 2) on cast en ActualityRow[]
		return rows as ActualityRow[];
	}
}

export default new AddActualityRepository();
