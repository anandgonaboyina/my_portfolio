"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function NewProjectPage() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const [projects, setProjects] = useState<any[]>([]);
    const [editingId, setEditingId] = useState<string | null>(null);
    
    const [formData, setFormData] = useState({
        title: "",
        slug: "",
        thumbnail_url: "",
        description: "",
        case_study: "",
        github_link: "",
        live_link: "",
    });

    const fetchProjects = async () => {
        try {
            const res = await fetch("/api/projects");
            if (res.ok) {
                const data = await res.json();
                setProjects(data);
            }
        } catch (e) {
            console.error("Failed to fetch projects", e);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0])
            setFile(e.target.files[0])
    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleEdit = (project: any) => {
        setEditingId(project.id);
        setFormData({
            title: project.title,
            slug: project.slug,
            thumbnail_url: project.thumbnail_url,
            description: project.description,
            case_study: project.case_study,
            github_link: project.github_link || "",
            live_link: project.live_link || "",
        });
        setFile(null);
        if (document.getElementById("fileInput")) {
            (document.getElementById("fileInput") as HTMLInputElement).value = "";
        }
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        setFormData({ title: "", slug: "", thumbnail_url: "", description: "", case_study: "", github_link: "", live_link: "" });
        setFile(null);
        if (document.getElementById("fileInput")) {
            (document.getElementById("fileInput") as HTMLInputElement).value = "";
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this project?")) return;
        
        try {
            const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
            if (res.ok) {
                setMessage("✅ Project deleted successfully!");
                fetchProjects();
            } else {
                setMessage("❌ Failed to delete project.");
            }
        } catch (e) {
            console.error(e);
            setMessage("❌ An error occurred while deleting.");
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingId && !file) {
            setMessage("❌ Please select an image first.");
            return;
        }
        setIsSubmitting(true);
        setMessage("");

        try {
            let uploadedUrl = formData.thumbnail_url;

            if (file) {
                setMessage("Uploading to Cloudinary...");
                const fileUpload = new FormData();
                fileUpload.append("file", file)
                const uploadRes = await fetch("/api/upload", {
                    method: "POST",
                    body: fileUpload
                })
                if (!uploadRes.ok)
                    throw new Error("Image upload failed")
                const uploadData = await uploadRes.json();
                uploadedUrl = uploadData.secure_url;
            }

            const method = editingId ? "PUT" : "POST";
            const url = editingId ? `/api/projects/${editingId}` : "/api/projects";

            const dbRes = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...formData, thumbnail_url: uploadedUrl }),
            });

            if (dbRes.ok) {
                setMessage(editingId ? "✅ Project Updated Successfully!" : "✅ Project Added Successfully!");
                handleCancelEdit();
                fetchProjects();
            } else {
                setMessage("❌ Failed to save project.");
            }
        } catch (error) {
            console.error(error);
            setMessage("❌ An error occurred.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-8">
            <h1 className="text-3xl font-bold mb-8">{editingId ? "Edit Project" : "Add New Project"}</h1>

            {message && (
                <div className={`p-4 mb-6 rounded font-bold animate-in slide-in-from-top animate-out slide-out-to-top duration-500 ease-in-out ${message.includes("✅") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                    {message}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6 flex flex-col bg-white p-6 rounded-lg shadow-sm border border-gray-200">
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
                    <label className="block text-sm font-bold mb-2">Project Thumbnail {editingId && <span className="text-gray-400 font-normal">(Leave empty to keep existing)</span>}</label>
                    <input id="fileInput" type="file" name="thumbnail_url" accept="image/*" onChange={handleFileChange} className="w-full p-3 border rounded text-black" />
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

                {/* Submit Buttons */}
                <div className="flex gap-4">
                    <button disabled={isSubmitting} type="submit" className="flex-1 bg-blue-600 text-white font-bold py-4 rounded hover:bg-blue-700 transition disabled:opacity-50">
                        {isSubmitting ? "Saving to Database..." : (editingId ? "Update Project" : "Publish Project")}
                    </button>
                    {editingId && (
                        <button type="button" onClick={handleCancelEdit} className="flex-1 bg-gray-500 text-white font-bold py-4 rounded hover:bg-gray-600 transition">
                            Cancel Edit
                        </button>
                    )}
                </div>
            </form>

            <h2 className="text-2xl font-bold mt-16 mb-6">Existing Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.map((project) => (
                    <div key={project.id} className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col shadow-sm">
                        <div className="flex gap-4">
                            <img src={project.thumbnail_url} alt={project.title} className="w-24 h-24 object-cover rounded" />
                            <div className="flex-1">
                                <h3 className="font-bold text-lg">{project.title}</h3>
                                <p className="text-gray-500 text-sm line-clamp-2">{project.description}</p>
                            </div>
                        </div>
                        <div className="mt-4 flex gap-2 justify-end">
                            <button onClick={() => handleEdit(project)} className="px-4 py-2 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 font-medium transition">
                                Edit
                            </button>
                            <button onClick={() => handleDelete(project.id)} className="px-4 py-2 bg-red-50 text-red-600 rounded hover:bg-red-100 font-medium transition">
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
                {projects.length === 0 && (
                    <p className="text-gray-500 col-span-2">No projects found.</p>
                )}
            </div>
        </div>
    );
}