import { Github, Linkedin, Mail, Database } from 'lucide-react';
import { motion } from 'framer-motion';
import './Footer.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();
    const name = "Md. Aman Uddin Siyam";

    return (
        <footer className="footer relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-gray-900 to-black pointer-events-none" />

            <div className="container footer-container relative z-10 flex flex-col items-center justify-center text-center py-16">

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mb-8"
                >
                    <h2 className="text-4xl md:text-6xl font-bold mb-4">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 animate-gradient-x">
                            {name}
                        </span>
                    </h2>
                    <p className="text-gray-400 max-w-lg mx-auto text-sm md:text-base">
                        Bridging the gap between Complex AI Research and Production Software Engineering.
                    </p>
                </motion.div>

                <motion.div
                    className="flex gap-6 mb-12"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                >
                    {[
                        { icon: <Github size={24} />, href: "https://github.com/SIYAM1809", label: "GitHub" },
                        { icon: <Linkedin size={24} />, href: "https://linkedin.com/in/amansiyam18", label: "LinkedIn" },
                        { icon: <Database size={24} />, href: "https://kaggle.com/amansiyam", label: "Kaggle" },
                        { icon: <Mail size={24} />, href: "mailto:amansiyam44@gmail.com", label: "Email" }
                    ].map((social, idx) => (
                        <motion.a
                            key={idx}
                            href={social.href}
                            target={social.label === "Email" ? "_self" : "_blank"}
                            rel="noreferrer"
                            aria-label={social.label}
                            className="p-3 bg-white/5 rounded-full hover:bg-white/10 hover:text-primary transition-all border border-white/5 hover:border-primary/50 text-gray-300"
                            whileHover={{ y: -5, scale: 1.2, rotate: 5 }}
                            whileTap={{ scale: 0.9 }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                            {social.icon}
                        </motion.a>
                    ))}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="w-full border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500"
                >
                    <p>© {currentYear} All rights reserved.</p>
                    <p className="flex items-center gap-1 mt-2 md:mt-0">
                        Designed & Built by <span className="text-primary">Siyam</span>
                    </p>
                </motion.div>
            </div>
        </footer>
    );
};

export default Footer;
