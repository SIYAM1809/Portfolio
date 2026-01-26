import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Code2, Github, Linkedin, Mail } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setIsOpen(false);
    }, [location]);

    const navLinks = [
        { title: 'Home', path: '/' },
        { title: 'About', path: '/#about' },
        { title: 'Projects', path: '/#projects' },
        { title: 'Contact', path: '/#contact' },
    ];

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            className={`navbar ${scrolled ? 'scrolled' : ''}`}
        >
            <div className="container nav-container">
                {/* Logo */}
                <Link to="/" className="nav-logo">
                    <Code2 className="logo-icon" />
                    <span className="logo-text">Portfolio<span className="dot">.</span></span>
                </Link>

                {/* Desktop Navigation */}
                <div className="nav-links desktop-only">
                    {navLinks.map((link) => (
                        <a
                            key={link.title}
                            href={link.path}
                            className="nav-link"
                        >
                            {link.title}
                        </a>
                    ))}

                </div>

                {/* Mobile Filter Button */}
                <button
                    className="mobile-toggle"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle Menu"
                >
                    {isOpen ? <X /> : <Menu />}
                </button>

                {/* Mobile Menu Overlay */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mobile-menu"
                        >
                            {navLinks.map((link) => (
                                <a
                                    key={link.title}
                                    href={link.path}
                                    className="mobile-link"
                                >
                                    {link.title}
                                </a>
                            ))}


                            <div className="mobile-socials">
                                <a href="#" target="_blank" rel="noreferrer"><Github size={20} /></a>
                                <a href="#" target="_blank" rel="noreferrer"><Linkedin size={20} /></a>
                                <a href="#" target="_blank" rel="noreferrer"><Mail size={20} /></a>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.nav>
    );
};

export default Navbar;
