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
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Short Bio</label>
                            <textarea
                                value={localData.bioData.shortBio}
                                onChange={(e) => updateBio('shortBio', e.target.value)}
                                className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white h-24 focus:border-primary focus:outline-none"
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
                        {/* Add more bio fields here as needed */}
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

                {/* Placeholder for other sections */}
                {(activeSection === 'publications' || activeSection === 'certificates' || activeSection === 'hobbies') && (
                    <div className="text-center py-10 text-gray-400">
                        <p>Editor for {activeSection} coming soon!</p>
                        <p className="text-sm mt-2">(You can already edit Bio and Skills fully)</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ContentManager;
