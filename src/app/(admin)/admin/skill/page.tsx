"use client";

import { useState, useEffect } from "react";

export default function NewSkillPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState("");
    const [skills, setSkills] = useState<any[]>([]);
    const [editingId, setEditingId] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        name: "",
        category: "Frontend", // Default value
        logo: "",
    });

    const fetchSkills = async () => {
        try {
            const res = await fetch("/api/skills");
            if (res.ok) {
                const data = await res.json();
                setSkills(data);
            }
        } catch (e) {
            console.error("Failed to fetch skills", e);
        }
    };

    useEffect(() => {
        fetchSkills();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleEdit = (skill: any) => {
        setEditingId(skill.id);
        setFormData({
            name: skill.name,
            category: skill.category,
            logo: skill.logo,
        });
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        setFormData({ name: "", category: "Frontend", logo: "" });
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this skill?")) return;
        
        try {
            const res = await fetch(`/api/skills/${id}`, { method: "DELETE" });
            if (res.ok) {
                setMessage("✅ Skill deleted successfully!");
                fetchSkills();
            } else {
                setMessage("❌ Failed to delete skill.");
            }
        } catch (e) {
            console.error(e);
            setMessage("❌ An error occurred while deleting.");
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage("");

        try {
            const method = editingId ? "PUT" : "POST";
            const url = editingId ? `/api/skills/${editingId}` : "/api/skills";

            const res = await fetch(url, {
                method: method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                setMessage(editingId ? "✅ Skill Updated Successfully!" : "✅ Skill Added Successfully!");
                handleCancelEdit();
                fetchSkills();
            } else {
                setMessage("❌ Failed to save skill.");
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
        <div className="max-w-4xl mx-auto p-8">
            <h1 className="text-3xl font-bold mb-8">{editingId ? "Edit Skill" : "Add New Skill"}</h1>

            {message && (
                <div className={`p-4 mb-6 rounded font-bold animate-in slide-in-from-top animate-out slide-out-to-top duration-500 ease-in-out ${message.includes("✅") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                    {message}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6 flex flex-col bg-white p-6 rounded-lg shadow-sm border border-gray-200">
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

                <div className="flex gap-4">
                    <button disabled={isSubmitting} type="submit" className="flex-1 bg-blue-600 text-white font-bold py-4 rounded hover:bg-blue-700 transition disabled:opacity-50">
                        {isSubmitting ? "Saving..." : (editingId ? "Update Skill" : "Add Skill")}
                    </button>
                    {editingId && (
                        <button type="button" onClick={handleCancelEdit} className="flex-1 bg-gray-500 text-white font-bold py-4 rounded hover:bg-gray-600 transition">
                            Cancel Edit
                        </button>
                    )}
                </div>
            </form>

            <h2 className="text-2xl font-bold mt-16 mb-6">Existing Skills</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {skills.map((skill) => (
                    <div key={skill.id} className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col shadow-sm items-center text-center">
                        {skill.logo && skill.logo.includes("<svg") ? (
                            <div className="w-16 h-16 mb-2" dangerouslySetInnerHTML={{ __html: skill.logo }} />
                        ) : (
                            <img src={skill.logo} alt={skill.name} className="w-16 h-16 object-contain mb-2" />
                        )}
                        <h3 className="font-bold text-lg">{skill.name}</h3>
                        <p className="text-gray-500 text-sm mb-4">{skill.category}</p>
                        <div className="mt-auto flex gap-2 w-full">
                            <button onClick={() => handleEdit(skill)} className="flex-1 px-2 py-1 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 font-medium transition text-sm">
                                Edit
                            </button>
                            <button onClick={() => handleDelete(skill.id)} className="flex-1 px-2 py-1 bg-red-50 text-red-600 rounded hover:bg-red-100 font-medium transition text-sm">
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
                {skills.length === 0 && (
                    <p className="text-gray-500 col-span-full">No skills found.</p>
                )}
            </div>
        </div>
    );
}