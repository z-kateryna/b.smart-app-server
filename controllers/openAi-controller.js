import { OpenAI } from "openai";
import dotenv from "dotenv";

dotenv.config();

const APIKEY = process.env.OPENAI_API;

const openai = new OpenAI({
    apiKey: APIKEY,
});

async function generateResponse({ topic }) {
    const prompt = `
    I am a user of a microlearning app. Based on the chosen topic "${topic}", provide me with beginner-level subtopics.
    Response structure:
    - Please return an array of objects in JSON format.
    - Each object should have a "topic", a topic that user has chosen, an "id" (a number starting from 1) and a "name" (a beginner-level subtopic name).
    - Break down the general topic into smaller, logical and easy to understand sub-topics.
    - Provide at least 20 subtopics for each topic.
    - The subtopics should be beginner-friendly, consisting of 1-2 words. For example, for the topic "Computer programming": 
       - "Intro to JS"
       - "Intro to HTML"
       - "Basic CSS"
       - "Intro to SQL"
       - and so on.
    Make sure the response is simple and easily understandable.
    
    The response must **ONLY** include the JSON array with subtopics. Do not add any additional explanations or formatting outside of the JSON structure.
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

        const test = JSON.parse(generatedResponse);
        console.log(test);


        return test.subtopics; 

    } catch (error) {
        console.error("OpenAI API Error:", error);

        if (error.response && error.response.status === 429) {
            throw new Error("Too many requests. Please try again later.");
        }

        throw error;
    }
}




export { generateResponse };
