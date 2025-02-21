import { OpenAI } from "openai";
import dotenv from "dotenv";

dotenv.config();

const APIKEY = process.env.OPENAI_API;

const openai = new OpenAI({
  apiKey: APIKEY,
});

async function generateQueryResponse({ query, level}) {

    const prompt = `
    I am a user of a microlearning app, searching for ${level}-level learning on the subtopic "${query}". Please provide the following:
    
    1. The chosen subtopic, "${query}"
    2. 2-3 related subtopics that expand on "${query}" and are relevant to the specified level of complexity.
    
    Ensure that the subtopics are simple, clear, and easy to understand, without repeating content across different levels of complexity.
    
    The response must be a JSON array with the following structure for each object:
    
    {
      "id": <unique numeric identifier starting from 1>,
      "query": ["${query}", "related subtopic 1", "related subtopic 2", "related subtopic 3"]
    }
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
