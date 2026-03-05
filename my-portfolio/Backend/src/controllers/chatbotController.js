const { GoogleGenerativeAI } = require('@google/generative-ai');
const siyamKnowledge = require('../config/chatbotKnowledge');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.chat = async (req, res, next) => {
    try {
        const { message, history = [] } = req.body;

        if (!message || typeof message !== 'string' || message.trim() === '') {
            return res.status(400).json({ status: 'fail', message: 'Message is required.' });
        }

        const model = genAI.getGenerativeModel({
            model: 'gemini-1.5-flash',
            systemInstruction: siyamKnowledge,
        });

        // Convert frontend history format to Gemini format
        // history items: [{ role: 'user' | 'model', parts: [{ text: '...' }] }]
        const chat = model.startChat({ history });

        const result = await chat.sendMessage(message.trim());
        const responseText = result.response.text();

        res.status(200).json({
            status: 'success',
            data: { reply: responseText }
        });

    } catch (err) {
        next(err);
    }
};
