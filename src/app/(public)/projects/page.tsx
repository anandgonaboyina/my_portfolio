import { pool } from "@/lib/db";
import ProjectCard from "@/components/projectCard";

// Force Next.js to fetch fresh data every time (no stale caching)
export const dynamic = "force-dynamic";

export default async function ProjectsGallery() {
    let projects: any[] = [];
    try {
        const query = "SELECT * FROM portfolio_projects ORDER BY created_at DESC";
        const [rows] = await pool.execute(query);
        projects = rows as any[];
    } catch (error) {
        console.error("Failed to load projects", error);
    }

    return (
        <div className="relative min-h-screen bg-gray-50 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 relative z-10">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight text-gray-900">
                        My Full Stack <span className="text-blue-600">Websites Works</span>
                    </h1>
                    <div className="h-1 w-24 bg-blue-600 mx-auto rounded-full mb-6" />
                    <p className="text-gray-600 max-w-2xl mx-auto text-lg md:text-xl">
                        A collection of my work spanning full-stack web development, backend architecture, and physical hardware/IoT circuits.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                    {projects.length === 0 ? (
                        <p className="text-center col-span-full text-gray-500 py-20 text-lg">No projects found. Add some from the admin panel!</p>
                    ) : (
                        projects.map((project) => (
                            <div key={project.id}>
                                <ProjectCard project={project} />
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}