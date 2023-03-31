import { Configuration, OpenAIApi } from "openai";
import {context} from './context';

console.log(`context: `,context)

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message:
          "OpenAI API key not configured, please follow instructions in README.md",
      },
    });
    return;
  }

  console.log("req.body.script", req.body.script);
  const script = req.body.script || "";
  if (script.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a valid script",
      },
    });
    return;
  }

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(script),
      temperature: 0.6,
      max_tokens: 2000,
    });
    console.log("completion===>", completion.data);
    res.status(200).json({ result: completion.data.choices[0].text });
  } catch (error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: "An error occurred during your request.",
        },
      });
    }
  }
}

function generatePrompt(script) {
  console.log(script);
  return `
  Create clickup one or more stories and tasks from this script with acceptance criteria
  
  ‘${script}’
  
  Use the following context for the answer:
  
  The client is ${context.client.name}. 
  The app platforms the product is available on are ${context.platforms.join(', ')}.
  The tech stack for the project includes ${context.techStack.join(', ')}.
  
  Include in the response which ${context.currentProjects.map(({name})=> name).join(', ')} the task or story is a part of.
  
  Generate your Answer with JSON format like this with priority high, medium or low:
  {
    "stories": [
      {
        "name": string,
        "description": string,
        "time_estimate": integer,
        "isFeature": boolean,
        "isBug": boolean,
        "tasks": [
          {
            "name": string,
            "description": string,
            "time_estimate": integer,
            "isFeature": boolean,
            "isBug": boolean,
            "priority": string
          }
        ]
      }
    ]
  }
  please just reply JSON string formatted answer
  `;
}
