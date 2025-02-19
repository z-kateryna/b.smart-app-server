import { generateResponse } from './openai.js';

export const processUserChoice = async (req, res) => {
    try {
        const { topic } = req.body;

        if (!topic) {
            return res.status(400).json({
                error: "Missing topic"
            });

            const aiResponse = await generateResponse(topic);

            return res.status(200).json({
                success: true,
                subtopic: aiResponse
            });
        }
    } catch {

    }
}