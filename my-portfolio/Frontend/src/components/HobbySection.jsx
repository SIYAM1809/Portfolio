import { motion } from 'framer-motion';
import Reveal from './animations/Reveal';
import { usePortfolio } from '../context/PortfolioContext';

const HobbySection = () => {
    const { portfolioData } = usePortfolio();
    const hobbiesData = portfolioData?.hobbiesData || [];

    if (hobbiesData.length === 0) return null;

    return (
        <section id="hobbies" className="py-20 bg-black/20">
            <div className="container mx-auto px-4">
                <div className="neon-border-pulse relative overflow-hidden">
                    <Reveal>
                        <h2 className="section-title mb-12 text-center">Beyond <span className="text-gradient">Coding</span></h2>
                    </Reveal>

                    <div className="flex flex-wrap justify-center gap-8">
                        {hobbiesData.map((hobby, index) => (
                            <Reveal key={index} delay={index * 0.1}>
                                <motion.div
                                    className="spinning-border-circle w-40 h-40 flex flex-col items-center justify-center gap-3 rounded-full transition-all cursor-pointer relative z-10"
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
            </div>
        </section>
    );
};

export default HobbySection;
