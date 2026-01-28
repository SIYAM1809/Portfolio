import { motion } from 'framer-motion';
import Reveal from './animations/Reveal';
import { publicationsData } from '../data/portfolioData';
import { ExternalLink, BookOpen, Award } from 'lucide-react';

const PublicationSection = () => {
    return (
        <section id="publications" className="py-20">
            <div className="container mx-auto px-4">
                <Reveal>
                    <h2 className="section-title mb-12 text-center">Research <span className="text-gradient">Publications</span></h2>
                </Reveal>

                <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
                    {publicationsData.map((pub, index) => (
                        <Reveal key={index} delay={index * 0.1}>
                            <motion.div
                                className="glass-card p-6 h-full border border-white/10 hover:border-primary/50 transition-colors"
                                whileHover={{ y: -5 }}
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div className="p-2 bg-primary/20 rounded-lg text-primary">
                                        <BookOpen size={24} />
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${pub.status === 'Published'
                                        ? 'bg-green-500/20 text-green-400'
                                        : 'bg-yellow-500/20 text-yellow-400'
                                        }`}>
                                        {pub.status}
                                    </span>
                                </div>

                                <h3 className="text-xl font-bold mb-2 text-white">{pub.title}</h3>
                                <p className="text-gray-400 text-sm mb-4">{pub.authors}</p>

                                <div className="flex justify-between items-center mt-auto">
                                    <span className="text-sm font-semibold text-primary">{pub.venue}</span>
                                    <div className="flex gap-3">
                                        {pub.certificateLink && (
                                            <a
                                                href={pub.certificateLink}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="flex items-center gap-2 text-sm text-gray-300 hover:text-primary transition-colors"
                                            >
                                                <Award size={14} /> Certificate
                                            </a>
                                        )}
                                        {pub.link && (
                                            <a
                                                href={pub.link}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="flex items-center gap-2 text-sm text-gray-300 hover:text-primary transition-colors"
                                            >
                                                Read Paper <ExternalLink size={14} />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PublicationSection;
