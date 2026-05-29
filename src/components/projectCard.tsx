import Link from "next/link";

export default function ProjectCard({ project }: { project: any }) {
    return (
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full group w-full">

            {/* Thumbnail */}
            <Link href={`/projects/${project.slug}`} className="block h-48 sm:h-56 w-full overflow-hidden relative">
                <img
                    src={project.thumbnail_url}
                    alt={project.title}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
            </Link>

            {/* Content Area */}
            <div className="p-5 flex flex-col flex-grow">
                <Link href={`/projects/${project.slug}`}>
                    <h3 className="text-xl font-bold mb-2 text-gray-900 group-hover:text-blue-600 transition-colors">
                        {project.title}
                    </h3>
                </Link>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-grow">
                    {project.description}
                </p>

                {/* 3 Action Buttons */}
                <div className="grid grid-cols-1 gap-2 mt-auto">
                    <Link
                        href={`/projects/${project.slug}`}
                        className="w-full text-center bg-blue-50 text-blue-600 font-semibold py-2 rounded-lg hover:bg-blue-600 hover:text-white transition-colors text-sm"
                    >
                        Read Case Study
                    </Link>

                    <div className="grid grid-cols-2 gap-2">
                        {project.live_link ? (
                            <a
                                href={project.live_link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full text-center bg-gray-900 text-white font-semibold py-2 rounded-lg hover:bg-gray-800 transition-colors text-sm"
                            >
                                Check live site
                            </a>
                        ) : (
                            <button disabled className="w-full text-center bg-gray-100 text-gray-400 font-semibold py-2 rounded-lg cursor-not-allowed text-sm">
                                No Live Site
                            </button>
                        )}

                        {project.github_link ? (
                            <a
                                href={project.github_link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full text-center border-2 border-gray-200 text-gray-700 font-semibold py-2 rounded-lg hover:border-gray-900 hover:text-gray-900 transition-colors text-sm flex items-center justify-center gap-1"
                            >
                                GitHub
                            </a>
                        ) : (
                            <button disabled className="w-full text-center border-2 border-gray-100 text-gray-300 font-semibold py-2 rounded-lg cursor-not-allowed text-sm">
                                No Code
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
