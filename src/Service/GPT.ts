
import { Configuration, OpenAIApi } from "openai";

export async function sentPrompt(message:string,API_KEY:string){
        const openAi = new OpenAIApi(
            new Configuration({
              apiKey: API_KEY,
            })
          );
        const moderationResponse = await openAi.createModeration({
          input: message,
        });
        const completionResponse = await openAi.createChatCompletion({
          model: "gpt-3.5-turbo",
          temperature:0,
          messages: [{ role: "user", content: message }],
        })
        return completionResponse?.data?.choices[0].message?.content
  }