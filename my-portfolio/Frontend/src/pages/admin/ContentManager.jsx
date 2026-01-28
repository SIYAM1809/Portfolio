import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, Plus, Trash2, Code, Brain, Globe, Terminal } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

const ContentManager = () => {
    const { portfolioData, updateData, refreshData } = usePortfolio();
    const [localData, setLocalData] = useState(null);
    const [activeSection, setActiveSection] = useState('bio'); // bio, skills, publications, certificates, hobbies
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        if (portfolioData) {
            setLocalData(JSON.parse(JSON.stringify(portfolioData))); // Deep copy for editing
        }
    }, [portfolioData]);

    const handleSave = async () => {
        setSaving(true);
        setMessage(null);
        try {
            const result = await updateData(localData);
            if (result.success) {
                setMessage({ type: 'success', text: 'Content updated successfully!' });
                refreshData();
            } else {
                setMessage({ type: 'error', text: 'Failed to update: ' + result.error });
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'An unexpected error occurred.' });
        } finally {
            setSaving(false);
        }
    };

    // Helper to update nested state
    const updateBio = (field, value) => {
        setLocalData(prev => ({
            ...prev,
            bioData: { ...prev.bioData, [field]: value }
        }));
    };

    if (!localData) return <div className="text-white p-8">Loading content...</div>;

    return (
        <div className="content-manager">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-white">Content Manager</h1>
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center gap-2 px-6 py-2 bg-primary hover:bg-primary-dark rounded-xl text-white font-bold transition-all disabled:opacity-50"
                >
                    <Save size={20} />
                    {saving ? 'Saving...' : 'Save Changes'}
                </button>
            </div>

            {message && (
                <div className={`p-4 mb-6 rounded-lg ${message.type === 'success' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                    {message.text}
                </div>
            )}

            {/* Sub-Navigation */}
            <div className="flex gap-4 mb-8 overflow-x-auto pb-2 border-b border-white/10">
                {['bio', 'skills', 'publications', 'certificates', 'hobbies'].map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveSection(tab)}
                        className={`px-4 py-2 rounded-lg capitalize transition-colors ${activeSection === tab ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white'}`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Forms */}
            <div className="form-container bg-white/5 p-6 rounded-xl border border-white/10">
                {activeSection === 'bio' && (
                    <div className="space-y-6">
                        {/* Name & Short Bio */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Full Name</label>
                                <input
                                    type="text"
                                    value={localData.bioData.name}
                                    onChange={(e) => updateBio('name', e.target.value)}
                                    className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white focus:border-primary focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Availability Status</label>
                                <input
                                    type="text"
                                    value={localData.bioData.contact.availability}
                                    onChange={(e) => setLocalData(prev => ({ ...prev, bioData: { ...prev.bioData, contact: { ...prev.bioData.contact, availability: e.target.value } } }))}
                                    className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white focus:border-primary focus:outline-none"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Short Bio (Hero Section)</label>
                            <textarea
                                value={localData.bioData.shortBio}
                                onChange={(e) => updateBio('shortBio', e.target.value)}
                                className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white h-24 focus:border-primary focus:outline-none"
                            />
                        </div>

                        {/* Roles */}
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Roles (Typewriter Effect)</label>
                            <div className="flex flex-wrap gap-2">
                                {localData.bioData.roles.map((role, idx) => (
                                    <div key={idx} className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/10">
                                        <span className="text-sm text-gray-300">{role}</span>
                                        <button
                                            onClick={() => {
                                                const newRoles = [...localData.bioData.roles];
                                                newRoles.splice(idx, 1);
                                                updateBio('roles', newRoles);
                                            }}
                                            className="text-red-400 hover:text-red-300"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                ))}
                                <button
                                    onClick={() => {
                                        const newRole = prompt("Enter new role:");
                                        if (newRole) {
                                            updateBio('roles', [...localData.bioData.roles, newRole]);
                                        }
                                    }}
                                    className="px-3 py-1 bg-primary/20 text-primary border border-primary/30 rounded-full hover:bg-primary/30 transition-colors flex items-center gap-1 text-sm"
                                >
                                    <Plus size={14} /> Add Role
                                </button>
                            </div>
                        </div>

                        {/* About Me Paragraphs */}
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">About Me (Paragraphs)</label>
                            <div className="space-y-3">
                                {localData.bioData.aboutText.map((text, idx) => (
                                    <div key={idx} className="relative group">
                                        <textarea
                                            value={text}
                                            onChange={(e) => {
                                                const newText = [...localData.bioData.aboutText];
                                                newText[idx] = e.target.value;
                                                updateBio('aboutText', newText);
                                            }}
                                            className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white h-24 focus:border-primary focus:outline-none"
                                        />
                                        <button
                                            onClick={() => {
                                                const newText = [...localData.bioData.aboutText];
                                                newText.splice(idx, 1);
                                                updateBio('aboutText', newText);
                                            }}
                                            className="absolute top-2 right-2 text-gray-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                ))}
                                <button
                                    onClick={() => updateBio('aboutText', [...localData.bioData.aboutText, "New paragraph..."])}
                                    className="w-full py-2 border-2 border-dashed border-white/10 rounded-lg text-gray-400 hover:text-white hover:border-primary/50 transition-all flex items-center justify-center gap-2"
                                >
                                    <Plus size={16} /> Add Paragraph
                                </button>
                            </div>
                        </div>

                        {/* Contact Info */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                                <input
                                    type="text"
                                    value={localData.bioData.contact.email}
                                    onChange={(e) => setLocalData(prev => ({ ...prev, bioData: { ...prev.bioData, contact: { ...prev.bioData.contact, email: e.target.value } } }))}
                                    className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white focus:border-primary focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Location</label>
                                <input
                                    type="text"
                                    value={localData.bioData.contact.location}
                                    onChange={(e) => setLocalData(prev => ({ ...prev, bioData: { ...prev.bioData, contact: { ...prev.bioData.contact, location: e.target.value } } }))}
                                    className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white focus:border-primary focus:outline-none"
                                />
                            </div>
                        </div>

                        {/* Stats */}
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Stats</label>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {localData.bioData.stats.map((stat, idx) => (
                                    <div key={idx} className="p-3 bg-white/5 rounded-lg border border-white/10">
                                        <input
                                            type="text"
                                            value={stat.label}
                                            onChange={(e) => {
                                                const newStats = [...localData.bioData.stats];
                                                newStats[idx].label = e.target.value;
                                                updateBio('stats', newStats);
                                            }}
                                            className="w-full bg-transparent text-sm text-gray-400 mb-1 focus:outline-none"
                                            placeholder="Label"
                                        />
                                        <input
                                            type="text"
                                            value={stat.value}
                                            onChange={(e) => {
                                                const newStats = [...localData.bioData.stats];
                                                newStats[idx].value = e.target.value;
                                                updateBio('stats', newStats);
                                            }}
                                            className="w-full bg-transparent text-lg font-bold text-white focus:outline-none"
                                            placeholder="Value"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {activeSection === 'skills' && (
                    <div className="space-y-8">
                        {localData.skillsData.map((category, idx) => (
                            <div key={idx} className="p-4 bg-black/20 rounded-lg border border-white/5">
                                <h3 className="text-xl font-bold text-white mb-4">{category.category}</h3>
                                <div className="flex flex-wrap gap-2">
                                    {category.skills.map((skill, sIdx) => (
                                        <div key={sIdx} className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/10">
                                            <span className="text-sm text-gray-300">{skill}</span>
                                            <button
                                                onClick={() => {
                                                    const newSkills = [...category.skills];
                                                    newSkills.splice(sIdx, 1);
                                                    const newSkillsData = [...localData.skillsData];
                                                    newSkillsData[idx].skills = newSkills;
                                                    setLocalData({ ...localData, skillsData: newSkillsData });
                                                }}
                                                className="text-red-400 hover:text-red-300"
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    ))}
                                    <button
                                        onClick={() => {
                                            const newSkill = prompt("Enter new skill:");
                                            if (newSkill) {
                                                const newSkillsData = [...localData.skillsData];
                                                newSkillsData[idx].skills.push(newSkill);
                                                setLocalData({ ...localData, skillsData: newSkillsData });
                                            }
                                        }}
                                        className="px-3 py-1 bg-primary/20 text-primary border border-primary/30 rounded-full hover:bg-primary/30 transition-colors flex items-center gap-1 text-sm"
                                    >
                                        <Plus size={14} /> Add
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {activeSection === 'publications' && (
                    <div className="space-y-6">
                        {localData.publicationsData.map((pub, idx) => (
                            <div key={idx} className="p-6 bg-black/20 rounded-lg border border-white/5 relative group">
                                <button
                                    onClick={() => {
                                        const newData = [...localData.publicationsData];
                                        newData.splice(idx, 1);
                                        setLocalData({ ...localData, publicationsData: newData });
                                    }}
                                    className="absolute top-4 right-4 text-gray-500 hover:text-red-400 transition-colors"
                                >
                                    <Trash2 size={18} />
                                </button>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="md:col-span-2">
                                        <label className="block text-xs font-medium text-gray-400 mb-1">Title</label>
                                        <input
                                            type="text"
                                            value={pub.title}
                                            onChange={(e) => {
                                                const newData = [...localData.publicationsData];
                                                newData[idx].title = e.target.value;
                                                setLocalData({ ...localData, publicationsData: newData });
                                            }}
                                            className="w-full bg-black/30 border border-white/10 rounded-lg p-2 text-white focus:border-primary focus:outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-400 mb-1">Authors</label>
                                        <input
                                            type="text"
                                            value={pub.authors}
                                            onChange={(e) => {
                                                const newData = [...localData.publicationsData];
                                                newData[idx].authors = e.target.value;
                                                setLocalData({ ...localData, publicationsData: newData });
                                            }}
                                            className="w-full bg-black/30 border border-white/10 rounded-lg p-2 text-white focus:border-primary focus:outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-400 mb-1">Venue</label>
                                        <input
                                            type="text"
                                            value={pub.venue}
                                            onChange={(e) => {
                                                const newData = [...localData.publicationsData];
                                                newData[idx].venue = e.target.value;
                                                setLocalData({ ...localData, publicationsData: newData });
                                            }}
                                            className="w-full bg-black/30 border border-white/10 rounded-lg p-2 text-white focus:border-primary focus:outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-400 mb-1">Paper Link</label>
                                        <input
                                            type="text"
                                            value={pub.link}
                                            onChange={(e) => {
                                                const newData = [...localData.publicationsData];
                                                newData[idx].link = e.target.value;
                                                setLocalData({ ...localData, publicationsData: newData });
                                            }}
                                            className="w-full bg-black/30 border border-white/10 rounded-lg p-2 text-white focus:border-primary focus:outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-400 mb-1">Status</label>
                                        <select
                                            value={pub.status}
                                            onChange={(e) => {
                                                const newData = [...localData.publicationsData];
                                                newData[idx].status = e.target.value;
                                                setLocalData({ ...localData, publicationsData: newData });
                                            }}
                                            className="w-full bg-black/30 border border-white/10 rounded-lg p-2 text-white focus:border-primary focus:outline-none"
                                        >
                                            <option value="Published">Published</option>
                                            <option value="Accepted">Accepted</option>
                                            <option value="Under Review">Under Review</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        ))}

                        <button
                            onClick={() => {
                                const newPub = {
                                    title: "New Publication",
                                    authors: "Md. Aman Uddin Siyam, ...",
                                    venue: "Conference/Journal Name",
                                    link: "",
                                    certificateLink: "",
                                    status: "Published"
                                };
                                setLocalData({ ...localData, publicationsData: [...localData.publicationsData, newPub] });
                            }}
                            className="w-full py-3 border-2 border-dashed border-white/10 rounded-xl text-gray-400 hover:text-white hover:border-primary/50 hover:bg-primary/5 transition-all flex items-center justify-center gap-2"
                        >
                            <Plus size={20} /> Add Publication
                        </button>
                    </div>
                )}

                {activeSection === 'certificates' && (
                    <div className="space-y-8">
                        {localData.certificateCategories.map((category, idx) => (
                            <div key={idx} className="p-6 bg-black/20 rounded-lg border border-white/5 relative group">
                                <button
                                    onClick={() => {
                                        const newData = [...localData.certificateCategories];
                                        newData.splice(idx, 1);
                                        setLocalData({ ...localData, certificateCategories: newData });
                                    }}
                                    className="absolute top-4 right-4 text-gray-500 hover:text-red-400 transition-colors"
                                >
                                    <Trash2 size={18} />
                                </button>

                                <div className="mb-6 space-y-4">
                                    <h3 className="text-xl font-bold text-white mb-2">Category {idx + 1}</h3>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-400 mb-1">Category Title</label>
                                        <input
                                            type="text"
                                            value={category.title}
                                            onChange={(e) => {
                                                const newData = [...localData.certificateCategories];
                                                newData[idx].title = e.target.value;
                                                setLocalData({ ...localData, certificateCategories: newData });
                                            }}
                                            className="w-full bg-black/30 border border-white/10 rounded-lg p-2 text-white focus:border-primary focus:outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-400 mb-1">Description</label>
                                        <input
                                            type="text"
                                            value={category.description}
                                            onChange={(e) => {
                                                const newData = [...localData.certificateCategories];
                                                newData[idx].description = e.target.value;
                                                setLocalData({ ...localData, certificateCategories: newData });
                                            }}
                                            className="w-full bg-black/30 border border-white/10 rounded-lg p-2 text-white focus:border-primary focus:outline-none"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-4 pl-4 border-l-2 border-white/5">
                                    <h4 className="text-sm font-bold text-gray-300">Certificates in this Category</h4>
                                    {category.certificates.map((cert, cIdx) => (
                                        <div key={cIdx} className="grid grid-cols-1 md:grid-cols-3 gap-2 items-center bg-white/5 p-3 rounded-lg relative group/cert">
                                            <input
                                                type="text"
                                                placeholder="Certificate Title"
                                                value={cert.title}
                                                onChange={(e) => {
                                                    const newData = [...localData.certificateCategories];
                                                    newData[idx].certificates[cIdx].title = e.target.value;
                                                    setLocalData({ ...localData, certificateCategories: newData });
                                                }}
                                                className="bg-black/30 border border-white/10 rounded p-1 text-sm text-white focus:border-primary focus:outline-none"
                                            />
                                            <input
                                                type="text"
                                                placeholder="Date (e.g. 2024)"
                                                value={cert.date}
                                                onChange={(e) => {
                                                    const newData = [...localData.certificateCategories];
                                                    newData[idx].certificates[cIdx].date = e.target.value;
                                                    setLocalData({ ...localData, certificateCategories: newData });
                                                }}
                                                className="bg-black/30 border border-white/10 rounded p-1 text-sm text-white focus:border-primary focus:outline-none"
                                            />
                                            <div className="flex gap-2">
                                                <input
                                                    type="text"
                                                    placeholder="Link (Optional)"
                                                    value={cert.link}
                                                    onChange={(e) => {
                                                        const newData = [...localData.certificateCategories];
                                                        newData[idx].certificates[cIdx].link = e.target.value;
                                                        setLocalData({ ...localData, certificateCategories: newData });
                                                    }}
                                                    className="w-full bg-black/30 border border-white/10 rounded p-1 text-sm text-white focus:border-primary focus:outline-none"
                                                />
                                                <button
                                                    onClick={() => {
                                                        const newData = [...localData.certificateCategories];
                                                        newData[idx].certificates.splice(cIdx, 1);
                                                        setLocalData({ ...localData, certificateCategories: newData });
                                                    }}
                                                    className="text-red-400 hover:text-red-300"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                    <button
                                        onClick={() => {
                                            const newData = [...localData.certificateCategories];
                                            newData[idx].certificates.push({ title: "New Certificate", date: "2024", link: "" });
                                            setLocalData({ ...localData, certificateCategories: newData });
                                        }}
                                        className="text-xs px-3 py-1 bg-primary/20 text-primary rounded hover:bg-primary/30 transition-colors flex items-center gap-1"
                                    >
                                        <Plus size={14} /> Add Certificate
                                    </button>
                                </div>
                            </div>
                        ))}

                        <button
                            onClick={() => {
                                const newCat = {
                                    id: "new-category",
                                    title: "New Category",
                                    issuer: "Issuer Name",
                                    description: "Category Description",
                                    certificates: []
                                };
                                setLocalData({ ...localData, certificateCategories: [...localData.certificateCategories, newCat] });
                            }}
                            className="w-full py-3 border-2 border-dashed border-white/10 rounded-xl text-gray-400 hover:text-white hover:border-primary/50 hover:bg-primary/5 transition-all flex items-center justify-center gap-2"
                        >
                            <Plus size={20} /> Add Category
                        </button>
                    </div>
                )}

                {activeSection === 'hobbies' && (
                    <div className="space-y-6">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {localData.hobbiesData.map((hobby, idx) => (
                                <div key={idx} className="p-4 bg-black/20 rounded-lg border border-white/5 relative group text-center">
                                    <button
                                        onClick={() => {
                                            const newData = [...localData.hobbiesData];
                                            newData.splice(idx, 1);
                                            setLocalData({ ...localData, hobbiesData: newData });
                                        }}
                                        className="absolute top-2 right-2 text-gray-500 hover:text-red-400 transition-colors"
                                    >
                                        <Trash2 size={14} />
                                    </button>

                                    <div className="mb-2">
                                        <input
                                            type="text"
                                            value={hobby.icon}
                                            onChange={(e) => {
                                                const newData = [...localData.hobbiesData];
                                                newData[idx].icon = e.target.value;
                                                setLocalData({ ...localData, hobbiesData: newData });
                                            }}
                                            className="w-12 h-12 text-center text-2xl bg-black/30 border border-white/10 rounded-lg p-1 text-white focus:border-primary focus:outline-none mx-auto block"
                                            placeholder="🏏"
                                        />
                                        <span className="text-xs text-gray-500 mt-1 block">Emoji</span>
                                    </div>

                                    <input
                                        type="text"
                                        value={hobby.name}
                                        onChange={(e) => {
                                            const newData = [...localData.hobbiesData];
                                            newData[idx].name = e.target.value;
                                            setLocalData({ ...localData, hobbiesData: newData });
                                        }}
                                        className="w-full bg-black/30 border border-white/10 rounded p-1 text-sm text-center text-white focus:border-primary focus:outline-none"
                                        placeholder="Hobby Name"
                                    />
                                </div>
                            ))}

                            <button
                                onClick={() => {
                                    const newHobby = { name: "New Hobby", icon: "✨" };
                                    setLocalData({ ...localData, hobbiesData: [...localData.hobbiesData, newHobby] });
                                }}
                                className="p-4 border-2 border-dashed border-white/10 rounded-lg text-gray-400 hover:text-white hover:border-primary/50 hover:bg-primary/5 transition-all flex flex-col items-center justify-center gap-2 h-full min-h-[140px]"
                            >
                                <Plus size={24} />
                                <span className="text-sm">Add Hobby</span>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ContentManager;
