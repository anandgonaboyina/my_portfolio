import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const body = await req.json();
        const { name, category, logo } = body;
        
        const query = `UPDATE portfolio_skills SET name = ?, category = ?, logo = ? WHERE id = ?`;
        const values = [name, category, logo, id];

        const [rows] = await pool.execute(query, values);
        return NextResponse.json({ message: "Skill updated successfully" }, { status: 200 });
    } catch (error) {
        console.error("Database PUT Error", error);
        return NextResponse.json({ error: "Failed to update skill" }, { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const query = `DELETE FROM portfolio_skills WHERE id = ?`;
        const [rows] = await pool.execute(query, [id]);
        return NextResponse.json({ message: "Skill deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Database DELETE Error", error);
        return NextResponse.json({ error: "Failed to delete skill" }, { status: 500 });
    }
}

