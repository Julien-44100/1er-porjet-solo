// app/api/actualities/upload/route.ts
import { NextResponse } from "next/server";
import fs from "node:fs/promises";
import path from "node:path";

export async function POST(request: Request) {
	const formData = await request.formData();
	const file = formData.get("photo") as File | null;
	if (!file) {
		return NextResponse.json(
			{ error: "Pas de fichier envoyé" },
			{ status: 400 },
		);
	}

	// Créez /public/uploads si nécessaire
	const uploadDir = path.join(process.cwd(), "public", "uploads");
	await fs.mkdir(uploadDir, { recursive: true });

	// Sauvegarde du fichier
	const buffer = Buffer.from(await file.arrayBuffer());
	const filename = `${Date.now()}_${file.name}`;
	await fs.writeFile(path.join(uploadDir, filename), buffer);

	return NextResponse.json({
		message: "Upload réussi",
		data: { filename },
	});
}
