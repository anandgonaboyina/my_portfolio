"use client";

import { useState, useEffect } from "react";

export default function NewLifeMomentPage() {
    const [title, setTitle] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [message, setMessage] = useState("");
    const [moments, setMoments] = useState<any[]>([]);
    const [editingId, setEditingId] = useState<string | null>(null);

    const fetchMoments = async () => {
        try {
            const res = await fetch("/api/life");
            if (res.ok) {
                const data = await res.json();
                setMoments(data);
            }
        } catch (e) {
            console.error("Failed to fetch moments", e);
        }
    };

    useEffect(() => {
        fetchMoments();
    }, []);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleEdit = (moment: any) => {
        setEditingId(moment.id);
        setTitle(moment.title);
        setFile(null);
        if (document.getElementById("fileInput")) {
            (document.getElementById("fileInput") as HTMLInputElement).value = "";
        }
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        setTitle("");
        setFile(null);
        if (document.getElementById("fileInput")) {
            (document.getElementById("fileInput") as HTMLInputElement).value = "";
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this moment?")) return;
        
        try {
            const res = await fetch(`/api/life/${id}`, { method: "DELETE" });
            if (res.ok) {
                setMessage("✅ Moment deleted successfully!");
                fetchMoments();
            } else {
                setMessage("❌ Failed to delete moment.");
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

        setIsUploading(true);

        try {
            let imageUrl = "";

            if (file) {
                setMessage("Uploading to Cloudinary...");
                const formData = new FormData();
                formData.append("file", file);

                const uploadRes = await fetch("/api/upload", {
                    method: "POST",
                    body: formData,
                });

                if (!uploadRes.ok) throw new Error("Image upload failed");

                const uploadData = await uploadRes.json();
                imageUrl = uploadData.secure_url;
            }

            setMessage("Saving to MySQL Database...");

            const method = editingId ? "PUT" : "POST";
            const url = editingId ? `/api/life/${editingId}` : "/api/life";
            
            // Only send image_url if a new one was uploaded, else backend will ignore it or not update it
            const bodyData = editingId && !imageUrl ? { title } : { title, image_url: imageUrl };

            const dbRes = await fetch(url, {
                method: method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(bodyData),
            });

            if (dbRes.ok) {
                setMessage(editingId ? "✅ Moment Updated Successfully!" : "✅ Moment Added Successfully!");
                handleCancelEdit();
                fetchMoments();
            } else {
                setMessage("❌ Failed to save to database.");
            }
        } catch (error) {
            console.error(error);
            setMessage("❌ An error occurred during the process.");
        } finally {
            setIsUploading(false);
            setTimeout(() => { setMessage("") }, 3000)
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-8">
            <h1 className="text-3xl font-bold mb-8">{editingId ? "Edit Life Moment" : "Upload Life Moment"}</h1>

            {message && (
                <div className={`p-4 mb-6 rounded font-bold ${message.includes("✅") ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"}`}>
                    {message}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6 flex flex-col bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div>
                    <label className="block text-sm font-bold mb-2">Caption / Title</label>
                    <input
                        required
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full p-3 border rounded text-black"
                        placeholder="NIT Goa EEE Lab"
                    />
                </div>

                <div>
                    <label className="block text-sm font-bold mb-2">Select Image File {editingId && <span className="text-gray-400 font-normal">(Leave empty to keep existing)</span>}</label>
                    <input
                        id="fileInput"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="w-full p-3 border rounded text-black bg-white"
                    />
                </div>

                <div className="flex gap-4">
                    <button
                        disabled={isUploading}
                        type="submit"
                        className="flex-1 bg-blue-600 text-white font-bold py-4 rounded hover:bg-blue-700 transition disabled:opacity-50"
                    >
                        {isUploading ? "Processing..." : (editingId ? "Update Photo" : "Upload Photo")}
                    </button>
                    {editingId && (
                        <button type="button" onClick={handleCancelEdit} className="flex-1 bg-gray-500 text-white font-bold py-4 rounded hover:bg-gray-600 transition">
                            Cancel Edit
                        </button>
                    )}
                </div>
            </form>

            <h2 className="text-2xl font-bold mt-16 mb-6">Existing Life Moments</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {moments.map((moment) => (
                    <div key={moment.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm flex flex-col">
                        <img src={moment.image_url} alt={moment.title} className="w-full h-48 object-cover" />
                        <div className="p-4 flex flex-col flex-1">
                            <h3 className="font-bold text-lg mb-4">{moment.title}</h3>
                            <div className="mt-auto flex gap-2">
                                <button onClick={() => handleEdit(moment)} className="flex-1 px-4 py-2 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 font-medium transition text-sm">
                                    Edit
                                </button>
                                <button onClick={() => handleDelete(moment.id)} className="flex-1 px-4 py-2 bg-red-50 text-red-600 rounded hover:bg-red-100 font-medium transition text-sm">
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
                {moments.length === 0 && (
                    <p className="text-gray-500 col-span-full">No moments found.</p>
                )}
            </div>
        </div>
    );
}