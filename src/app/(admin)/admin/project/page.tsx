"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { POST } from "@/app/api/projects/route";

export default function NewProjectPage() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState("");
    const [file, setFile] = useState<File | null>(null)
    const [formData, setFormData] = useState({
        title: "",
        slug: "",
        thumbnail_url: "",
        description: "",
        case_study: "",
        github_link: "",
        live_link: "",
    });
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0])
            setFile(e.target.files[0])
    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file) {
            setMessage("❌ Please select an image first.");
            return;
        }
        setIsSubmitting(true);
        setMessage("");
        setMessage("Uploading to Cloudinary...");
        try {
            const fileUpload = new FormData();
            fileUpload.append("file", file)
            const uploadRes = await fetch("/api/upload", {
                method: "POST",
                body: fileUpload
            })
            if (!uploadRes.ok)
                throw new Error("Image upload failed")
            const uploadData = await uploadRes.json();
            // THIS IS WHERE YOUR FRONTEND TALKS TO YOUR BACKEND
            const dbRes = await fetch("/api/projects", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...formData, thumbnail_url: uploadData.secure_url }),
            });

            if (dbRes.ok) {
                setMessage("✅ Project Added Successfully!");
                setFormData({ title: "", slug: "", thumbnail_url: "", description: "", case_study: "", github_link: "", live_link: "" });
                // Optional: router.push('/admin/projects');
                setFile(null);
                (document.getElementById("fileInput") as HTMLInputElement).value = ""
            } else {
                setMessage("❌ Failed to add project.");
            }
        } catch (error) {
            console.error(error);
            setMessage("❌ An error occurred.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-8">
            <h1 className="text-3xl font-bold mb-8">Add New Project</h1>

            {message && (
                <div className={`p-4 mb-6 rounded font-bold animate-in slide-in-from-top animate-out slide-out-to-top duration-500 ease-in-out ${message.includes("✅") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                    {message}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6 flex flex-col">
                {/* Title & Slug */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-bold mb-2">Project Title</label>
                        <input required type="text" name="title" value={formData.title} onChange={handleChange} className="w-full p-3 border rounded text-black" placeholder="BTech Central Hub" />
                    </div>
                    <div>
                        <label className="block text-sm font-bold mb-2">URL Slug (No spaces)</label>
                        <input required type="text" name="slug" value={formData.slug} onChange={handleChange} className="w-full p-3 border rounded text-black" placeholder="btech-central-hub" />
                    </div>
                </div>

                {/* Thumbnail URL */}
                <div>
                    <label className="block text-sm font-bold mb-2">Project Thumbnail</label>
                    <input id="fileInput" required type="file" name="thumbnail_url" accept="image/*" onChange={handleFileChange} className="w-full p-3 border rounded text-black" placeholder="https://res.cloudinary.com/..." />
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm font-bold mb-2">Short Description</label>
                    <textarea required name="description" value={formData.description} onChange={handleChange} className="w-full p-3 border rounded h-24 text-black" placeholder="A brief summary of the project..."></textarea>
                </div>

                {/* Case Study */}
                <div>
                    <label className="block text-sm font-bold mb-2">Deep Dive Case Study</label>
                    <textarea required name="case_study" value={formData.case_study} onChange={handleChange} className="w-full p-3 border rounded h-48 text-black" placeholder="Explain the architecture, challenges, and tech stack here..."></textarea>
                </div>

                {/* Links */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-bold mb-2">GitHub Link</label>
                        <input type="text" name="github_link" value={formData.github_link} onChange={handleChange} className="w-full p-3 border rounded text-black" placeholder="https://github.com/..." />
                    </div>
                    <div>
                        <label className="block text-sm font-bold mb-2">Live Demo Link</label>
                        <input type="text" name="live_link" value={formData.live_link} onChange={handleChange} className="w-full p-3 border rounded text-black" placeholder="https://..." />
                    </div>
                </div>

                {/* Submit Button */}
                <button disabled={isSubmitting} type="submit" className="w-full bg-blue-600 text-white font-bold py-4 rounded hover:bg-blue-700 transition disabled:opacity-50">
                    {isSubmitting ? "Saving to Database..." : "Publish Project"}
                </button>
            </form>
        </div>
    );
}