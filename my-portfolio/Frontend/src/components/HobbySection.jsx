import { motion } from 'framer-motion';
import Reveal from './animations/Reveal';
import { hobbiesData } from '../data/portfolioData.jsx';

const HobbySection = () => {
    return (
        <section id="hobbies" className="py-20 bg-black/20">
            <div className="container mx-auto px-4">
                <Reveal>
                    <h2 className="section-title mb-12 text-center">Beyond <span className="text-gradient">Coding</span></h2>
                </Reveal>

                <div className="flex flex-wrap justify-center gap-8">
                    {hobbiesData.map((hobby, index) => (
                        <Reveal key={index} delay={index * 0.1}>
                            <motion.div
                                className="glass-card w-40 h-40 flex flex-col items-center justify-center gap-3 rounded-full border-2 border-white/5 hover:border-primary/50 transition-all cursor-pointer relative z-10 bg-black/40"
                                animate={{ y: [0, -15, 0] }}
                                transition={{
                                    duration: 3 + index,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                                whileHover={{ scale: 1.1, rotate: 5, borderColor: "rgba(139, 92, 246, 0.8)", boxShadow: "0 0 30px rgba(139, 92, 246, 0.2)" }}
                            >
                                <span className="text-4xl">{hobby.icon}</span>
                                <span className="font-medium text-white">{hobby.name}</span>
                            </motion.div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HobbySection;
