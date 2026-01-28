import { motion } from 'framer-motion';
import Reveal from './animations/Reveal';
import { certificatesData } from '../data/portfolioData';
import { Award, ExternalLink } from 'lucide-react';

const CertificateSection = () => {
    return (
        <section id="certificates" className="py-20 bg-black/20">
            <div className="container mx-auto px-4">
                <Reveal>
                    <h2 className="section-title mb-12 text-center">Certifications & <span className="text-gradient">Achievements</span></h2>
                </Reveal>

                <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {certificatesData.map((cert, index) => (
                        <Reveal key={index} delay={index * 0.1}>
                            <motion.div
                                className="glass-card p-6 flex flex-col items-center text-center h-full hover:bg-white/5 transition-colors"
                                whileHover={{ scale: 1.02 }}
                            >
                                <div className="mb-4 p-4 bg-gradient-to-br from-primary/20 to-purple-500/20 rounded-full text-primary">
                                    <Award size={32} />
                                </div>

                                <h3 className="text-lg font-bold text-white mb-2">{cert.title}</h3>
                                <p className="text-gray-400 text-sm mb-1">{cert.issuer}</p>
                                <p className="text-gray-500 text-xs mb-4">{cert.date}</p>

                                {cert.link && (
                                    <a
                                        href={cert.link}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="mt-auto px-4 py-2 text-xs font-medium border border-white/10 rounded-full hover:bg-primary/20 hover:border-primary/50 transition-all flex items-center gap-2"
                                    >
                                        View Credential <ExternalLink size={12} />
                                    </a>
                                )}
                            </motion.div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CertificateSection;
