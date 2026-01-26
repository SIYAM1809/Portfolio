import { Github, Linkedin, Mail, Twitter, Heart, Database } from 'lucide-react';
import './Footer.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="container footer-container">

                <div className="footer-top">
                    <div className="footer-brand">
                        <h3>Siyam<span>.</span></h3>
                        <p>Bridging AI/ML research with robust software engineering.</p>
                    </div>

                    <div className="footer-socials">
                        <a href="https://github.com/SIYAM1809" target="_blank" rel="noreferrer" className="social-icon" aria-label="GitHub"><Github size={20} /></a>
                        <a href="https://linkedin.com/in/amansiyam18" target="_blank" rel="noreferrer" className="social-icon" aria-label="LinkedIn"><Linkedin size={20} /></a>
                        <a href="https://kaggle.com/amansiyam" target="_blank" rel="noreferrer" className="social-icon" aria-label="Kaggle"><Database size={20} /></a>
                        <a href="mailto:amansiyam44@gmail.com" className="social-icon" aria-label="Email"><Mail size={20} /></a>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p className="copyright">
                        © {currentYear} Md. Aman Uddin Siyam. All rights reserved.
                    </p>
                    <p className="credit">
                        Made with <Heart size={14} className="heart-icon" /> and React
                    </p>
                </div>

            </div>
        </footer>
    );
};

export default Footer;
