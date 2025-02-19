import { OpenAI } from "openai";
import dotenv from "dotenv";

dotenv.config();

const APIKEY = process.env.OPENAI_API;

const openai = new OpenAI({
    apiKey: APIKEY,
  });

  async function generateResponse(formData) {
    const { topic } = formData;
  
    const prompt = `
    
    I am user of a microlearning app. Based on the chosen ${topic} provide me with subtopics that I can start my learnin with. BEgginer level as default.
    
     Response structure: give just 1-2 word option for each subtopic.
     Ensure that the response is clear and written in simple language.`

     try {
        // Make the API request to OpenAI
        const response = await openai.chat.completions.create({
          model: "gpt-4o",
          messages: [
            {
              role: "system",
              content: `You are an expert in microlearning, provide subtopics suggestions fot microleanring based on the topic chosen`,
            },
            {
              role: "user",
              content: prompt,
            },
          ],
        });
    
        let generatedResponse = response.choices[0].message.content.trim();
        console.log(generatedResponse);
    
        return generatedResponse;
      } catch (error) {
        console.error("OpenAI API Error:", error);
    
        if (error.response && error.response.status === 429) {
          throw new Error("Too many requests. Please try again later.");
        }
    
        throw error;
      }
    }
    
    export { generateResponse };