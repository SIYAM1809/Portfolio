import { motion } from 'framer-motion';
import Reveal from './animations/Reveal';
import { skillsData } from '../data/portfolioData';

const SkillSection = () => {
    return (
        <section id="skills" className="py-20">
            <div className="container mx-auto px-4">
                <Reveal>
                    <h2 className="section-title mb-16 text-center">Technical <span className="text-gradient">Skills</span></h2>
                </Reveal>

                <div className="grid gap-8 md:grid-cols-2">
                    {skillsData.map((category, idx) => (
                        <Reveal key={idx} delay={idx * 0.1}>
                            <div className="glass-card p-8">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="text-primary">{category.icon}</div>
                                    <h3 className="text-xl font-bold text-white">{category.category}</h3>
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    {category.skills.map((skill, sIdx) => (
                                        <motion.span
                                            key={sIdx}
                                            className="px-3 py-1 bg-white/5 border border-white/10 rounded text-sm text-gray-300 hover:text-white hover:border-primary/50 transition-colors cursor-default"
                                            whileHover={{ y: -2 }}
                                        >
                                            {skill}
                                        </motion.span>
                                    ))}
                                </div>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SkillSection;
