import { NextResponse } from "next/server";
import { pool } from "@/lib/db"
export async function GET() {
    try {
        const query = `SELECT * FROM portfolio_skills ORDER BY category ASC`;
        const [rows] = await pool.execute(query);
        return NextResponse.json(rows)
    }
    catch (error) {
        console.error("Database GET error", error);
        return NextResponse.json({ error: "Failed to fetch skills" }, { status: 500 })
    }
}


export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, category, logo } = body;
        const query = `INSERT INTO portfolio_skills (name, category, logo) VALUES (?, ?, ?)`;
        const values = [name, category, logo];
        const [rows] = await pool.execute(query, values);
        return NextResponse.json({ message: "skill Added successfully" }, { status: 201 })
    }
    catch (error) {
        console.error("Database POST Error", error);
        return NextResponse.json({ error: "Failed to Add skill" }, { status: 500 })
    }
}