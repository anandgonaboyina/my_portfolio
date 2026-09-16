import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const body = await req.json();
        const { title, image_url } = body;
        
        let query;
        let values;

        if (image_url) {
            query = `UPDATE portfolio_life SET title = ?, image_url = ? WHERE id = ?`;
            values = [title, image_url, id];
        } else {
            query = `UPDATE portfolio_life SET title = ? WHERE id = ?`;
            values = [title, id];
        }

        const [rows] = await pool.execute(query, values);
        return NextResponse.json({ message: "Life moment updated successfully" }, { status: 200 });
    } catch (error) {
        console.error("Database PUT Error", error);
        return NextResponse.json({ error: "Failed to update life moment" }, { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const query = `DELETE FROM portfolio_life WHERE id = ?`;
        const [rows] = await pool.execute(query, [id]);
        return NextResponse.json({ message: "Life moment deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Database DELETE Error", error);
        return NextResponse.json({ error: "Failed to delete life moment" }, { status: 500 });
    }
}

