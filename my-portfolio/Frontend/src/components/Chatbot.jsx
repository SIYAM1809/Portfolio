import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

const Chatbot = () => {
    const { portfolioData } = usePortfolio();
    const chatbotData = portfolioData?.chatbotData;

    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const messagesEndRef = useRef(null);

    // Initialize greeting when data loads
    useEffect(() => {
        if (chatbotData?.greeting && messages.length === 0) {
            setMessages([{ type: 'bot', text: chatbotData.greeting }]);
        }
    }, [chatbotData]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const handleQuestionClick = (question, answer) => {
        // Add user question
        setMessages(prev => [...prev, { type: 'user', text: question }]);

        // Simulate typing delay
        setTimeout(() => {
            setMessages(prev => [...prev, { type: 'bot', text: answer }]);
        }, 500);
    };

    const handleSend = (e) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        // Add user message
        setMessages(prev => [...prev, { type: 'user', text: inputValue }]);
        const userText = inputValue.toLowerCase();
        setInputValue('');

        // Simulate typing delay & intelligent response
        setTimeout(() => {
            let responseText = "";

            // 1. Check FAQs first (Exact or partial match)
            const matchedFaq = chatbotData?.faqs?.find(faq =>
                userText.includes(faq.question.toLowerCase()) ||
                faq.question.toLowerCase().includes(userText)
            );

            if (matchedFaq) {
                responseText = matchedFaq.answer;
            } else {
                // 2. Keyword Matching through Portfolio Data

                // --- Bio / About ---
                if (userText.includes('who') || userText.includes('about') || userText.includes('bio') || userText.includes('yourself') || userText.includes('name')) {
                    responseText = portfolioData?.bioData?.shortBio || portfolioData?.bioData?.aboutText?.[0] || "I am Siyam, a Machine Learning Engineer and Full Stack Developer.";
                }

                // --- Contact / Hire ---
                else if (userText.includes('contact') || userText.includes('email') || userText.includes('hire') || userText.includes('job') || userText.includes('reach')) {
                    responseText = `You can reach Siyam at ${portfolioData?.bioData?.contact?.email || 'his email'}. He is currently ${portfolioData?.bioData?.contact?.availability || 'available'}.`;
                }

                // --- Skills / Tech Stack ---
                else if (userText.includes('skill') || userText.includes('tech') || userText.includes('stack') || userText.includes('program') || userText.includes('language') || userText.includes('react') || userText.includes('python')) {
                    const allSkills = portfolioData?.skillsData?.flatMap(s => s.skills).join(', ');
                    responseText = `Siyam is proficient in: ${allSkills}.`;
                }

                // --- Publications / Research ---
                else if (userText.includes('paper') || userText.includes('research') || userText.includes('publication') || userText.includes('article') || userText.includes('thesis')) {
                    const papers = portfolioData?.publicationsData?.map(p => p.title).join('; ');
                    responseText = `Here are some of his key publications: ${papers}.`;
                }

                // --- Certifications / Learning ---
                else if (userText.includes('certificat') || userText.includes('course') || userText.includes('bagde') || userText.includes('learning')) {
                    responseText = "Siyam has certifications from EDGE, Kaggle, and Google Cloud, covering Machine Learning, Deep Learning, and Generative AI.";
                }

                // --- Hobbies ---
                else if (userText.includes('hobby') || userText.includes('interest') || userText.includes('like') || userText.includes('cricket')) {
                    const hobbies = portfolioData?.hobbiesData?.map(h => h.name).join(', ');
                    responseText = `In his free time, Siyam enjoys: ${hobbies}.`;
                }

                // --- Projects (Generic fallback if no specific project data in context) ---
                else if (userText.includes('project') || userText.includes('built') || userText.includes('work')) {
                    responseText = "Siyam has worked on over 10 key projects involving Medical Imaging, Reproducible ML pipelines, and Full Stack Web Apps. Check out the Projects section!";
                }

                // --- Fallback ---
                else {
                    responseText = "I think you are out of the context, please ask relevent question";
                }
            }

            setMessages(prev => [...prev, { type: 'bot', text: responseText }]);
        }, 500);
    };

    if (!chatbotData) return null; // Don't render if no data

    return (
        <>
            <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="fixed bottom-6 right-6 z-[9999] p-4 bg-[#00D9FF] rounded-full shadow-lg shadow-[#00D9FF]/20 text-black font-bold flex items-center justify-center group"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="absolute inset-0 rounded-full animate-ping bg-[#00D9FF] opacity-20 group-hover:opacity-40"></div>
                {!isOpen ? <MessageSquare size={24} /> : <X size={24} />}
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="fixed bottom-24 right-6 w-80 md:w-96 h-[500px] glass-card flex flex-col z-[9999] overflow-hidden border border-[#00D9FF]/20 shadow-2xl"
                    >
                        {/* Header */}
                        <div className="p-4 bg-[#00D9FF]/10 border-b border-white/10 flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                <h3 className="font-bold text-white">Siyam's Assistant</h3>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-gray-400 hover:text-white"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        {/* Chat Area */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
                            {messages.map((msg, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.type === 'user'
                                        ? 'bg-[#00D9FF] text-black rounded-tr-none'
                                        : 'bg-white/10 text-gray-200 rounded-tl-none'
                                        }`}>
                                        {msg.text}
                                    </div>
                                </motion.div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Quick Options */}
                        {/* Quick Options */}
                        <div className="p-4 border-t border-white/10 bg-black/20">
                            {chatbotData.faqs && chatbotData.faqs.length > 0 && (
                                <div className="mb-3">
                                    <p className="text-xs text-gray-500 mb-2 font-medium">Suggested Questions:</p>
                                    <div className="flex flex-wrap gap-2">
                                        {chatbotData.faqs.map((faq, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => handleQuestionClick(faq.question, faq.answer)}
                                                className="text-xs px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:bg-[#00D9FF]/20 hover:border-[#00D9FF]/50 text-gray-300 hover:text-[#00D9FF] transition-colors text-left"
                                            >
                                                {faq.question}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Input Area */}
                            <form onSubmit={handleSend} className="flex gap-2">
                                <input
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    placeholder="Type a message..."
                                    className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#00D9FF]/50 placeholder-gray-500"
                                />
                                <button
                                    type="submit"
                                    className="p-2 bg-[#00D9FF] text-black rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                                    disabled={!inputValue.trim()}
                                >
                                    <Send size={18} />
                                </button>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Chatbot;
