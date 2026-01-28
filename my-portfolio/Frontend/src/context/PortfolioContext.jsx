import { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';
// Fallback data in case API fails or is loading strictly for first paint if needed,
// but usually we want to wait for real data. We will import the file as a fallback backup.
import { bioData as staticBio, skillsData as staticSkills, publicationsData as staticPubs, certificateCategories as staticCerts, hobbiesData as staticHobbies, chatbotData as staticChatbot } from '../data/portfolioData.jsx';

const PortfolioContext = createContext();

export const usePortfolio = () => {
    return useContext(PortfolioContext);
};

export const PortfolioProvider = ({ children }) => {
    const [portfolioData, setPortfolioData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchPortfolioData = async () => {
        setLoading(true);
        try {
            const response = await api.get('/portfolio');
            if (response.data?.data) {
                setPortfolioData(response.data.data);
            } else {
                // Should not happen if seeded, but handle validation
                throw new Error("Invalid data structure");
            }
        } catch (err) {
            console.error("Failed to fetch portfolio data, using static fallback:", err);
            setError(err.message);
            // Fallback to static data so the site doesn't crash
            setPortfolioData({
                bioData: staticBio,
                skillsData: staticSkills,
                publicationsData: staticPubs,
                certificateCategories: staticCerts,
                hobbiesData: staticHobbies,
                chatbotData: staticChatbot
            });
        } finally {
            setLoading(false);
        }
    };

    const updatePortfolioData = async (newData) => {
        try {
            const response = await api.put('/portfolio', newData);
            if (response.data?.data) {
                setPortfolioData(response.data.data);
                return { success: true };
            }
        } catch (err) {
            console.error("Failed to update portfolio data:", err);
            return { success: false, error: err.message };
        }
    };

    useEffect(() => {
        fetchPortfolioData();
    }, []);

    const value = {
        portfolioData,
        loading,
        error,
        refreshData: fetchPortfolioData,
        updateData: updatePortfolioData
    };

    return (
        <PortfolioContext.Provider value={value}>
            {children}
        </PortfolioContext.Provider>
    );
};
