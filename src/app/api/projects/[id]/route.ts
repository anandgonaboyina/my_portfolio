import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const body = await req.json();
        const { title, slug, thumbnail_url, description, case_study, github_link, live_link } = body;
        
        let query;
        let values;

        // If thumbnail_url is empty, do not update it
        if (thumbnail_url) {
            query = `UPDATE portfolio_projects SET title = ?, slug = ?, thumbnail_url = ?, description = ?, case_study = ?, github_link = ?, live_link = ? WHERE id = ?`;
            values = [title, slug, thumbnail_url, description, case_study, github_link, live_link, id];
        } else {
            query = `UPDATE portfolio_projects SET title = ?, slug = ?, description = ?, case_study = ?, github_link = ?, live_link = ? WHERE id = ?`;
            values = [title, slug, description, case_study, github_link, live_link, id];
        }

        const [rows] = await pool.execute(query, values);
        return NextResponse.json({ message: "Project updated successfully" }, { status: 200 });
    } catch (error) {
        console.error("Database PUT Error", error);
        return NextResponse.json({ error: "Failed to update project" }, { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const query = `DELETE FROM portfolio_projects WHERE id = ?`;
        const [rows] = await pool.execute(query, [id]);
        return NextResponse.json({ message: "Project deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Database DELETE Error", error);
        return NextResponse.json({ error: "Failed to delete project" }, { status: 500 });
    }
}
