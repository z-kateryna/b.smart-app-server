import { OpenAI } from "openai";
import dotenv from "dotenv";

dotenv.config();

const APIKEY = process.env.OPENAI_API;

const openai = new OpenAI({
  apiKey: APIKEY,
});

async function generateFeedResponse({ subtopic }) {
    console.log(subtopic)
  const prompt = `
You are an expert in microlearning. Based on the chosen ${subtopic}, generate bite-sized learning materials. 

For each subtopic, create a **1-sentence** learning material that explains the concept in a simple and easy-to-understand way. Each learning material should be beginner-friendly.

Response structure:
- Return an array of objects in JSON format.
- Each object should have:
    - "id": A unique identifier for the learning material (starting from 1).
    - "name": The name of the subtopic.
    - "content": A **1-sentence** learning material that explains the subtopic in an easy-to-understand manner.

For example, for the subtopic "Intro to JS":
- "id": 1
- "name": "Intro to JS"
- "content": "JavaScript is a programming language used to make websites interactive by adding dynamic elements like buttons and forms."

Ensure that the content is clear, concise, and understandable for beginners.

    `;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are an expert in microlearning. Provide learning material that explains the subtopic in an easy-to-understand manner based on chosen subtopic`,
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      response_format: { type: "json_object" },
    });

    let generatedResponse = response.choices[0].message.content.trim();

    console.log("OpenAI Response:", generatedResponse);

    const materialResponse = JSON.parse(generatedResponse);
    console.log(materialResponse);

    return materialResponse;
  } catch (error) {
    console.error("OpenAI API Error:", error);

    if (error.response && error.response.status === 429) {
      throw new Error("Too many requests. Please try again later.");
    }

    throw error;
  }
}

export { generateFeedResponse };
