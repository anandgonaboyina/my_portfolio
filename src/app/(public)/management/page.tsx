import Link from "next/link";

export default function ManagementWarning() {
    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center bg-gray-50 p-8 text-center">
            <div className="bg-white p-10 rounded-2xl shadow-xl border max-w-lg w-full">
                <svg className="w-16 h-16 text-blue-600 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
                <h1 className="text-3xl font-extrabold mb-4 text-gray-900">Personal Management</h1>
                <p className="text-gray-600 mb-8 leading-relaxed">
                    This area is strictly for my personal use to manage portfolio content, update projects, and maintain database integrity.
                    <br /><br />
                    If you are a recruiter, feel free to explore the public site!
                </p>
                <div className="flex flex-col gap-4">
                    <Link href="/admin" className="bg-black text-sm text-white px-4 py-4 rounded-lg font-bold hover:bg-gray-800 transition">
                        Proceed to Admin Login &rarr;
                    </Link>
                    <Link href="/" className="text-blue-600 font-bold hover:underline">
                        &larr; Return to Portfolio
                    </Link>
                </div>
            </div>
        </div>
    );
}