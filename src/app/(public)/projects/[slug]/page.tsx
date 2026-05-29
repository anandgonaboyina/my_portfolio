import { pool } from "@/lib/db";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function ProjectCaseStudy({ params }: { params: Promise<{ slug: string }> }) {
    const query = "SELECT * FROM portfolio_projects WHERE slug = ?";
    const value = (await params).slug;
    const [rows] = await pool.execute(query, [value]) as any[];

    if (rows.length === 0) {
        notFound();
    }
    const project = rows[0];

    return (
        <div className="bg-gray-50 min-h-screen text-gray-900 pb-20">
            {/* Hero Header Area */}
            <div className="bg-white border-b border-gray-200 pt-10 pb-12 sm:pt-16 sm:pb-16 px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">


                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-gray-900">
                        {project.title}
                    </h1>
                    <p className="text-lg sm:text-xl text-gray-600 font-medium leading-relaxed max-w-3xl">
                        {project.description}
                    </p>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="max-w-4xl mx-auto px-6 lg:px-8 mt-10">

                {/* Thumbnail */}
                <div className="w-full rounded-2xl overflow-hidden shadow-lg border border-gray-200 mb-10 bg-white">
                    <img
                        src={project.thumbnail_url}
                        alt={project.title}
                        className="w-full h-auto"
                    />
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4 mb-12 pb-10 border-b border-gray-200">
                    {project.live_link && (
                        <a
                            href={project.live_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full sm:w-auto text-center bg-blue-600 text-white px-8 py-3.5 rounded-xl font-bold hover:bg-blue-700 hover:shadow-lg hover:-translate-y-0.5 transition-all shadow-sm"
                        >
                            Visit Live Application
                        </a>
                    )}
                    {project.github_link && (
                        <a
                            href={project.github_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full sm:w-auto text-center bg-gray-900 text-white px-8 py-3.5 rounded-xl font-bold hover:bg-gray-800 hover:shadow-lg hover:-translate-y-0.5 transition-all shadow-sm flex items-center justify-center gap-2"
                        >
                            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                            View Source Code
                        </a>
                    )}
                </div>

                {/* Case Study */}
                <article className="prose prose-lg sm:prose-xl max-w-none text-gray-800 prose-a:text-blue-600 hover:prose-a:text-blue-500">
                    <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900 border-l-4 border-blue-600 pl-4">
                        Architecture & Case Study
                    </h2>
                    <div className="whitespace-pre-wrap leading-relaxed">
                        {project.case_study}
                    </div>
                </article>
            </div>
        </div>
    );
}