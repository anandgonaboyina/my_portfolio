import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { SignOutButton } from "@clerk/nextjs"
import Link from "next/link";

const ALLOWED_EMAILS = [
    "anandsuperuser@gmail.com",
    "anandgonaboyina@gmail.com",
    "sativeeramma@gmail.com"
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
    // Fetch the currently logged-in user securely from the server
    const user = await currentUser();

    // If somehow they bypassed middleware, redirect to sign in
    if (!user) {
        redirect("/sign-in");
    }
    const userEmail = user.emailAddresses[0]?.emailAddress;

    if (!ALLOWED_EMAILS.includes(userEmail)) {
        return (
            <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-8 text-center">
                <svg className="w-24 h-24 text-red-500 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8V7a4 4 0 00-8 0v4h8z"></path>
                </svg>
                <h1 className="text-4xl font-extrabold mb-4 text-red-500">Security Breach Attempted</h1>
                <p className="text-xl text-gray-300 max-w-lg mb-8">
                    Not authorized. This vault is strictly restricted to <span className="text-transparent font-bold bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                        Anand Kumar
                    </span> for Adding skills and Projects.
                    <br /><br />
                    Logged in as: <span className="font-bold text-white">{userEmail}</span>
                </p>
                <SignOutButton>
                    <Link href="/" className="bg-blue-600 text-white px-8 py-4 rounded-lg font-bold hover:bg-blue-700 transition">
                        SignOut & Return to Public Portfolio
                    </Link>
                </SignOutButton>
            </div>
        );
    }

    // If they ARE on the list, render the Admin UI normally!
    return (
        <div className="min-h-screen bg-gray-50 text-black">
            <nav className="bg-blue-900 text-white p-4 shadow-md">
                <div className="max-w-6xl mx-auto flex justify-between items-center">
                    <span className="font-bold text-xl">Anand's Command Center</span>
                    <Link href="/" className="text-blue-200 hover:text-white transition">Exit to Live Site &rarr;</Link>
                </div>
            </nav>
            {children}
        </div>
    );
}