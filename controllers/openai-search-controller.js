import { OpenAI } from "openai";
import dotenv from "dotenv";

dotenv.config();

const APIKEY = process.env.OPENAI_API;

const openai = new OpenAI({
  apiKey: APIKEY,
});

async function generateQueryResponse({ query }) {
  const prompt = `
    I am a user of a microlearning app, and I am searching for beginner-level learning on the subtopic "${query}". Please provide:

    The chosen subtopic, "${query}"
    2-3 related subtopic suggestions based on "${query}"
    Ensure the response is simple and easily understandable.

    The response must only include a JSON array with the following structure for each object:

    "id": A unique numeric identifier starting from 1
    "query": The chosen subtopic, "${query}"
    "subtopics": An array of 2-3 related subtopics
    Do not add any additional explanations or formatting outside of the JSON structure.
    `;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are an expert in microlearning. Find subtopic based on user query and based on user choice provide couple suggestions for microlearning based on the topic.`,
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

    const result = JSON.parse(generatedResponse);
    console.log(result);

    return result;
  } catch (error) {
    console.error("OpenAI API Error:", error);

    if (error.response && error.response.status === 429) {
      throw new Error("Too many requests. Please try again later.");
    }

    throw error;
  }
}

export { generateQueryResponse };
