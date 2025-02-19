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
    Response structure: give just 1-2 word options for each subtopic. Only beginner level, 20 topics at least. Here is example: for Computer programming topic: Intro to JS, Intro to HTML, Basic CSS, Computer science principals. 

Intro to SQL: Querying and managing data
    Ensure that the response is clear and written in simple language. The response has to be an array of objects in json format, each of the subtopics has to have an id and a name. 
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

        // // Extract subtopics from the response string
        // const subtopicPattern = /\d+\.\s*([a-zA-Z\s]+)/g;  // Match numbered subtopics
        // const subtopics = [];
        // let match;

        // // Loop through the matches and create an array of objects
        // while ((match = subtopicPattern.exec(generatedResponse)) !== null) {
        //     subtopics.push({
        //         id: subtopics.length + 1,  // Generate unique ID
        //         name: match[1].trim(),     // Clean the name from the matched string
        //     });
        // }

        // console.log("Formatted Subtopics:", subtopics);
        return test.subtopics;  // Return an array of objects

    } catch (error) {
        console.error("OpenAI API Error:", error);

        if (error.response && error.response.status === 429) {
            throw new Error("Too many requests. Please try again later.");
        }

        throw error;
    }
}




export { generateResponse };
