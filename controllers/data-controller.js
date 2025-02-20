import { generateResponse } from "./openai-controller.js";
import { generateFeedResponse } from "./openai-feed-controller.js";

export const processUserChoice = async (req, res) => {
    try {
        const { topic } = req.body;

        if (!topic) {
            return res.status(400).json({ error: "Missing topic" });
        }

        const aiResponse = await generateResponse({ topic });

        return res.status(200).json({
            success: true,  
            subtopics: aiResponse  
        });
    } catch (error) {
        console.error("Error processing user choice:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const processUserSubtopicChoice = async (req, res) => {
    try {
        const { subtopic } = req.body;

        if (!subtopic) {
            return res.status(400).json({ error: "Missing subtopic" });
        }

        const aiResponse = await generateFeedResponse({ subtopic });

        return res.status(200).json({
            success: true,  
            materials: aiResponse  
        });
    } catch (error) {
        console.error("Error processing user choice:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

