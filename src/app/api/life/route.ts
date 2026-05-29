import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function GET() {
    try {
        const query = "SELECT * FROM portfolio_life ORDER BY created_at DESC";
        const [rows] = await pool.execute(query);
        return NextResponse.json(rows);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch life moments" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { title, image_url } = body;

        const query = "INSERT INTO portfolio_life (title, image_url) VALUES (?, ?)";
        await pool.execute(query, [title, image_url]);

        return NextResponse.json({ message: "Moment Added successfully" }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to Add moment" }, { status: 500 });
    }
}