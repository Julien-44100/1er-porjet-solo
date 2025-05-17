import type { ResultSetHeader, RowDataPacket } from "mysql2";
import client from "../db";
import type { Actuality } from "./ActualyType";

export class ActualityRepository {
	async findAll(): Promise<Actuality[]> {
		const [rows] = await client.query<RowDataPacket[]>(
			`SELECT
         id,
         name_actuality,
         add_photo,
         description_actuality AS description_actuality,
         createdAt
       FROM actuality`,
		);
		return rows as Actuality[];
	}

	async create(data: Omit<Actuality, "id" | "createdAt">): Promise<number> {
		const [result] = await client.query<ResultSetHeader>(
			`INSERT INTO actuality (name_actuality, add_photo, description_actuality)
       VALUES (?, ?, ?)`,
			[data.name_actuality, data.add_photo, data.description_actuality],
		);
		return result.insertId;
	}

	async update(
		id: number,
		data: Partial<Omit<Actuality, "id" | "createdAt">>,
	): Promise<number> {
		const [result] = await client.query<ResultSetHeader>(
			`UPDATE actuality
         SET name_actuality      = ?,
             add_photo           = ?,
             description_actuality = ?
       WHERE id = ?`,
			[data.name_actuality, data.add_photo, data.description_actuality, id],
		);
		return result.affectedRows;
	}
}

export default new ActualityRepository();
