import { NextResponse } from "next/server";
import ActualityRepository from "../../../pages/lib/Actuality/ActualityRepository";

export async function GET() {
	const items = await ActualityRepository.findAll();
	return NextResponse.json(items);
}

export async function POST(request: Request) {
	const body = await request.json();
	const insertId = await ActualityRepository.create(body);
	return NextResponse.json({ id: insertId }, { status: 201 });
}
