import type { RowDataPacket, ResultSetHeader } from "mysql2";
import client from "../../lib/db";
import type { addactuality } from "./AddActuality";

interface ActualityRow {
	id: number;
	name_actuality: string;
	add_photo: string | null;
	actuality: string;
	createdAt: Date;
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
		const [rows] = await client.query<RowDataPacket[]>(
			"SELECT * FROM add_actuality ORDER BY id DESC",
		);

		return rows as ActualityRow[];
	}
}

export default new AddActualityRepository();
