import { motion } from 'framer-motion';
import { ArrowLeft, Award, ExternalLink, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { certificateCategories } from '../data/portfolioData';
import Reveal from '../components/animations/Reveal';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import SEO from '../components/utils/SEO';
import ScrollToTop from '../components/utils/ScrollToTop';

const Certificates = () => {
    return (
        <div className="min-h-screen bg-background text-text-primary">
            <SEO title="Certificates" />
            <ScrollToTop />
            <Navbar />

            <main className="pt-24 pb-20 px-4">
                <div className="container mx-auto max-w-5xl">
                    <div className="mb-16 text-center">
                        <Link to="/" className="inline-flex items-center text-gray-400 hover:text-primary transition-colors mb-6">
                            <ArrowLeft size={20} className="mr-2" /> Back to Home
                        </Link>
                        <Reveal width="100%">
                            <h1 className="text-4xl md:text-5xl font-bold mb-6">
                                Professional <span className="text-gradient">Certifications</span>
                            </h1>
                            <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
                                A comprehensive list of my certifications and achievements across various domains including AI, Machine Learning, and Cloud Computing.
                            </p>
                        </Reveal>
                    </div>

                    <div className="space-y-20">
                        {certificateCategories.map((category, index) => (
                            <section key={category.id} id={category.id} className="scroll-mt-24">
                                <Reveal delay={index * 0.1} width="100%">
                                    <div className="flex flex-col items-center text-center mb-10 border-b border-white/5 pb-8">
                                        <div className="p-4 bg-primary/10 rounded-full text-primary border border-primary/20 mb-4 shadow-lg shadow-primary/10">
                                            <Award size={36} />
                                        </div>

                                        <h2 className="text-3xl font-bold text-white mb-3">
                                            <span className="text-gradient-purple">{category.title}</span>
                                        </h2>

                                        <p className="text-purple-200/80 text-lg max-w-3xl font-medium tracking-wide">
                                            {category.description}
                                        </p>
                                    </div>

                                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                        {category.certificates.map((cert, cIndex) => (
                                            <motion.div
                                                key={cIndex}
                                                className="glass-card p-6 border border-white/5 hover:border-primary/50 transition-all group relative overflow-hidden flex flex-col h-full"
                                                whileHover={{ y: -5, borderColor: "rgba(139, 92, 246, 0.6)", boxShadow: "0 0 25px rgba(139, 92, 246, 0.15)" }}
                                                initial={{ opacity: 0, y: 20 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                transition={{ delay: cIndex * 0.1 }}
                                                viewport={{ once: true }}
                                            >
                                                {/* Hover Gradient Background */}
                                                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                                <div className="flex justify-between items-start mb-4 relative z-10">
                                                    <span className="text-xs font-mono px-3 py-1 bg-white/5 rounded-full text-gray-400 group-hover:text-primary group-hover:bg-primary/10 transition-colors border border-white/5">
                                                        {category.issuer}
                                                    </span>
                                                </div>

                                                <h3 className="text-lg font-bold text-white mb-3 leading-snug group-hover:text-primary transition-colors relative z-10">
                                                    {cert.title}
                                                </h3>

                                                <div className="mt-auto pt-4 border-t border-white/5 relative z-10">
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center text-sm text-gray-500">
                                                            <Calendar size={14} className="mr-2 text-primary/70" />
                                                            {cert.date}
                                                        </div>

                                                        {cert.link && (
                                                            <a
                                                                href={cert.link}
                                                                target="_blank"
                                                                rel="noreferrer"
                                                                className="flex items-center gap-1.5 text-xs font-semibold text-white bg-primary/20 hover:bg-primary px-3 py-1.5 rounded-md transition-all group-hover:shadow-lg group-hover:shadow-primary/25"
                                                            >
                                                                View <ExternalLink size={12} />
                                                            </a>
                                                        )}
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </Reveal>
                            </section>
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Certificates;
