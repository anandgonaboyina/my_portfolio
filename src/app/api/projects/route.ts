import { NextResponse } from "next/server";
import { pool } from "@/lib/db"
export async function GET() {
    try {
        const query = `SELECT * FROM portfolio_projects ORDER BY created_at DESC`;
        const [rows] = await pool.execute(query);
        return NextResponse.json(rows)
    }
    catch (error) {
        console.error("Database GET error", error);
        return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 })
    }
}


export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { title, slug, thumbnail_url, description, case_study, github_link, live_link } = body;
        const query = `INSERT INTO portfolio_projects (title, slug, thumbnail_url, description, case_study, github_link, live_link ) VALUES (?, ?, ?, ?, ?, ?, ?)`;
        const values = [title, slug, thumbnail_url, description, case_study, github_link, live_link];
        const [rows] = await pool.execute(query, values);
        return NextResponse.json({ message: "Project Added successfully" }, { status: 201 })
    }
    catch (error) {
        console.error("Database POST Error", error);
        return NextResponse.json({ error: "Failed to Add project" }, { status: 500 })
    }
}