"use client";

import { useState } from "react";

export default function NewLifeMomentPage() {
    const [title, setTitle] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [message, setMessage] = useState("");

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file) {
            setMessage("❌ Please select an image first.");
            return;
        }

        setIsUploading(true);
        setMessage("Uploading to Cloudinary...");

        try {
            // 1. Package the file into FormData
            const formData = new FormData();
            formData.append("file", file);

            // 2. Send to our Cloudinary backend route
            const uploadRes = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            if (!uploadRes.ok) throw new Error("Image upload failed");

            const uploadData = await uploadRes.json();
            const imageUrl = uploadData.secure_url;

            setMessage("Saving to MySQL Database...");

            // 3. Send the Title and the new Cloudinary URL to MySQL
            const dbRes = await fetch("/api/life", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title: title, image_url: imageUrl }),
            });

            if (dbRes.ok) {
                setMessage("✅ Moment Added Successfully!");
                setTitle("");
                setFile(null);
                // Reset the file input visually
                (document.getElementById("fileInput") as HTMLInputElement).value = "";
            } else {
                setMessage("❌ Failed to save to database.");
            }
        } catch (error) {
            console.error(error);
            setMessage("❌ An error occurred during the process.");
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="max-w-xl mx-auto p-8">
            <h1 className="text-3xl font-bold mb-8">Upload Life Moment</h1>

            {message && (
                <div className={`p-4 mb-6 rounded font-bold ${message.includes("✅") ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"}`}>
                    {message}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6 flex flex-col">
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
                    <label className="block text-sm font-bold mb-2">Select Image File</label>
                    <input
                        required
                        id="fileInput"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="w-full p-3 border rounded text-black bg-white"
                    />
                </div>

                <button
                    disabled={isUploading}
                    type="submit"
                    className="w-full bg-blue-600 text-white font-bold py-4 rounded hover:bg-blue-700 transition disabled:opacity-50"
                >
                    {isUploading ? "Processing Upload..." : "Upload Photo"}
                </button>
            </form>
        </div>
    );
}