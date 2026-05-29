import Link from "next/link";
import { SignOutButton } from "@clerk/nextjs";

export default function AdminDashboard() {
    return (
        <div className="max-w-2xl mx-auto px-4 py-8 sm:py-12">
            <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Dashboard</h1>
                    <p className="text-sm text-gray-500 mt-1">Manage your portfolio content.</p>
                </div>

                <SignOutButton>
                    <button className="w-full sm:w-auto bg-gray-100 text-gray-700 hover:bg-red-50 hover:text-red-600 px-4 py-2 rounded-lg font-medium transition-colors border border-gray-200 hover:border-red-200">
                        Sign Out
                    </button>
                </SignOutButton>
            </div>

            <div className="flex flex-col gap-3">
                <Link href="/admin/project" className="bg-white border border-gray-200 rounded-xl p-4 flex items-center justify-between hover:border-blue-400 hover:shadow-md transition-all group">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                            </svg>
                        </div>
                        <div>
                            <h2 className="font-bold text-gray-900 text-lg">Projects</h2>
                            <p className="text-sm text-gray-500">Add portfolio projects</p>
                        </div>
                    </div>
                    <span className="text-gray-400 group-hover:text-blue-500 transition-colors group-hover:translate-x-1">&rarr;</span>
                </Link>

                <Link href="/admin/skill" className="bg-white border border-gray-200 rounded-xl p-4 flex items-center justify-between hover:border-green-400 hover:shadow-md transition-all group">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <div>
                            <h2 className="font-bold text-gray-900 text-lg">Tech Stack</h2>
                            <p className="text-sm text-gray-500">Add your skills and tools</p>
                        </div>
                    </div>
                    <span className="text-gray-400 group-hover:text-green-500 transition-colors group-hover:translate-x-1">&rarr;</span>
                </Link>

                <Link href="/admin/life" className="bg-white border border-gray-200 rounded-xl p-4 flex items-center justify-between hover:border-purple-400 hover:shadow-md transition-all group">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <div>
                            <h2 className="font-bold text-gray-900 text-lg">Life Beyond</h2>
                            <p className="text-sm text-gray-500">Upload photos to your gallery</p>
                        </div>
                    </div>
                    <span className="text-gray-400 group-hover:text-purple-500 transition-colors group-hover:translate-x-1">&rarr;</span>
                </Link>
            </div>
        </div>
    );
}