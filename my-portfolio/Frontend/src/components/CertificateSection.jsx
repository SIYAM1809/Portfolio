import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Reveal from './animations/Reveal';
import { certificateCategories } from '../data/portfolioData.jsx';
import { Award, ExternalLink } from 'lucide-react';

const CertificateSection = () => {
    // Show top 3 categories as highlights
    const highlights = certificateCategories.slice(0, 3);

    return (
        <section id="certificates" className="py-20 bg-black/20">
            <div className="container mx-auto px-4">
                <Reveal>
                    <h2 className="section-title mb-12 text-center">Certifications & <span className="text-gradient">Achievements</span></h2>
                </Reveal>

                <div className="grid gap-6 grid-cols-1 md:grid-cols-3 mb-10 items-stretch">
                    {highlights.map((category, index) => (
                        <Reveal key={index} delay={index * 0.1} width="100%">
                            <motion.div
                                className="glass-card p-8 flex flex-col items-center text-center h-full min-h-[320px] transition-colors border border-white/5 relative group overflow-hidden"
                                whileHover={{ y: -10, borderColor: "rgba(139, 92, 246, 0.8)", boxShadow: "0 0 30px rgba(139, 92, 246, 0.2)" }}
                                transition={{ duration: 0.3 }}
                            >
                                {/* Background Gradient Shine */}
                                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                                <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                <motion.div
                                    className="mb-6 p-4 bg-gradient-to-br from-primary/20 to-purple-500/20 rounded-full text-primary shadow-lg shadow-primary/10 relative z-10"
                                    whileHover={{ scale: 1.1, rotate: 5, boxShadow: "0 0 20px rgba(139, 92, 246, 0.3)" }}
                                >
                                    <Award size={40} />
                                </motion.div>

                                <h3 className="text-xl font-bold text-white mb-3 relative z-10">{category.title}</h3>
                                <p className="text-gray-400 text-sm mb-6 flex-grow relative z-10">{category.description}</p>

                                <div className="mt-auto flex flex-col gap-3 w-full relative z-10">
                                    <span className="inline-block px-4 py-1 bg-white/5 rounded-full text-xs font-semibold text-gray-300 border border-white/5 group-hover:border-primary/30 transition-colors">
                                        {category.certificates.length} Certifications
                                    </span>

                                    <Link
                                        to={`/certificates#${category.id}`}
                                        className="text-xs text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 flex items-center justify-center gap-1 font-bold"
                                    >
                                        View Details <ExternalLink size={12} />
                                    </Link>
                                </div>
                            </motion.div>
                        </Reveal>
                    ))}
                </div>

                <Reveal delay={0.3}>
                    <div className="flex justify-center">
                        <Link
                            to="/certificates"
                            className="group relative px-8 py-3 bg-gradient-to-r from-primary to-purple-600 rounded-full font-bold text-white overflow-hidden shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all hover:scale-105 active:scale-95"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                View All Certificates <ExternalLink size={18} />
                            </span>
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                        </Link>
                    </div>
                </Reveal>
            </div>
        </section>
    );
};

export default CertificateSection;
