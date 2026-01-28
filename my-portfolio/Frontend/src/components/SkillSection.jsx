const SpotlightCard = ({ category, idx }) => {
    let mouseX = useMotionValue(0);
    let mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }) {
        let { left, top } = currentTarget.getBoundingClientRect();

        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <div
            className={`${(idx === 1 || idx === 2) ? 'md:col-span-2' : 'md:col-span-1'}`}
        >
            <Reveal delay={idx * 0.1} width="100%">
                <div
                    className="glass-card h-full min-h-[200px] group relative border border-white/5 bg-gray-900/50 overflow-hidden rounded-xl"
                    onMouseMove={handleMouseMove}
                >
                    <motion.div
                        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
                        style={{
                            background: useMotionTemplate`
                                radial-gradient(
                                650px circle at ${mouseX}px ${mouseY}px,
                                rgba(139, 92, 246, 0.15),
                                transparent 80%
                                )
                            `,
                        }}
                    />

                    <div className="p-8 relative h-full flex flex-col justify-between z-10">
                        <div>
                            <div className="flex items-center gap-3 mb-6">
                                <motion.div
                                    className="text-primary p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors"
                                    whileHover={{ rotate: 15, scale: 1.1 }}
                                >
                                    {category.icon}
                                </motion.div>
                                <h3 className="text-xl font-bold text-white relative z-10">{category.category}</h3>
                            </div>

                            <div className="flex flex-wrap gap-2 relative z-10">
                                {category.skills.map((skill, sIdx) => (
                                    <motion.span
                                        key={sIdx}
                                        className="px-3 py-1 bg-white/5 border border-white/10 rounded text-sm text-gray-300 hover:text-white hover:border-primary/50 transition-colors cursor-default"
                                        whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: idx * 0.1 + sIdx * 0.05 }}
                                    >
                                        {skill}
                                    </motion.span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </Reveal>
        </div>
    );
}

export default SkillSection;
