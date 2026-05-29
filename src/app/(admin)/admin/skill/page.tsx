"use client";

import { useState } from "react";

export default function NewSkillPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState("");

    const [formData, setFormData] = useState({
        name: "",
        category: "Frontend", // Default value
        logo: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage("");

        try {
            const res = await fetch("/api/skills", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                setMessage("✅ Skill Added Successfully!");
                setFormData({ name: "", category: "Frontend", logo: "" });
            } else {
                setMessage("❌ Failed to add skill.");
            }
        } catch (error) {
            console.error(error);
            setMessage("❌ An error occurred.");
        } finally {
            setIsSubmitting(false);
            setTimeout(() => { setMessage("") }, 3000)
        }
    };

    return (
        <div className="max-w-xl mx-auto p-8">
            <h1 className="text-3xl font-bold mb-8">Add New Skill</h1>

            {message && (
                <div className={`p-4 mb-6 rounded font-bold animate-in slide-in-from-top animate-out slide-out-to-top duration-500 ease-in-out ${message.includes("✅") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                    {message}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6 flex flex-col">
                {/* Name & Category */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-bold mb-2">Skill Name</label>
                        <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full p-3 border rounded text-black" placeholder="React.js" />
                    </div>
                    <div>
                        <label className="block text-sm font-bold mb-2">Category</label>
                        <select name="category" value={formData.category} onChange={handleChange} className="w-full p-3 border rounded text-black">
                            <option value="Frontend">Frontend</option>
                            <option value="Backend">Backend</option>
                            <option value="Hardware">Hardware / IoT</option>
                            <option value="Tools">Tools & Core</option>
                        </select>
                    </div>
                </div>

                {/* Logo URL */}
                <div>
                    <label className="block text-sm font-bold mb-2">Logo SVG/PNG URL</label>
                    <input required type="text" name="logo" value={formData.logo} onChange={handleChange} className="w-full p-3 border rounded text-black" placeholder="https://cdn.jsdelivr.net/..." />
                </div>


                <button disabled={isSubmitting} type="submit" className="w-full bg-blue-600 text-white font-bold py-4 rounded hover:bg-blue-700 transition disabled:opacity-50">
                    {isSubmitting ? "Saving..." : "Add Skill"}
                </button>
            </form>
        </div>
    );
}