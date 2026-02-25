import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const Reveal = ({ children, width = "fit-content", delay = 0, className = "", overflow = "hidden" }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    return (
        <div ref={ref} className={className} style={{ position: 'relative', width, overflow }}>
            <motion.div
                variants={{
                    hidden: { opacity: 0, y: 75 },
                    visible: { opacity: 1, y: 0 },
                }}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                transition={{ duration: 0.5, delay }}
            >
                {children}
            </motion.div>
        </div>
    );
};

export default Reveal;
