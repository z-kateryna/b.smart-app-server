import { OpenAI } from "openai";
import dotenv from "dotenv";

dotenv.config();

const APIKEY = process.env.OPENAI_API;

const openai = new OpenAI({
    apiKey: APIKEY,
});

async function generateResponse({ topic}) {


    const prompt = `
    I am a user of a microlearning app. Based on the chosen topic "${topic}", provide 30 subtopics that help to learn more about the subject.
    
    Response structure:
    - Return a JSON array with the following fields:
      - "id" (Number starting from 1)
      - "topic" (The user-chosen topic)
      - "name" (The subtopic name in Title Case)
      - "level" (The complexity level: "beginner", "intermediate", or "advanced")
    - Break down the topic into smaller, logical subtopics, with 10 subtopics per level:
      - 10 for "beginner"
      - 10 for "intermediate"
      - 10 for "advanced"
    - Each subtopic should consist of 1-2 words. For example, for "Computer Programming":
      - "Intro to JS" (beginner level)
      - "HTML" (intermediate level)
      - "MySQL Triggers" (advanced level)
    - Keep the response simple and relevant to the chosen topic and level of complexity.
    
    Return **ONLY** the JSON array with subtopics. Do not add explanations or any other formatting.
    `;
    
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                {
                    role: "system",
                    content: `You are an expert in microlearning. Provide subtopic suggestions for microlearning based on the topic chosen.`,
                },
                {
                    role: "user",
                    content: prompt,
                },
            ],
            response_format: { "type": "json_object" }
        });

        let generatedResponse = response.choices[0].message.content.trim();

        console.log("OpenAI Response:", generatedResponse);

        const parsedResponse = JSON.parse(generatedResponse);
        console.log(parsedResponse);

        return parsedResponse.subtopics; 

    } catch (error) {
        console.error("OpenAI API Error:", error);

        if (error.response && error.response.status === 429) {
            throw new Error("Too many requests. Please try again later.");
        }

        throw error;
    }
}

export { generateResponse };
