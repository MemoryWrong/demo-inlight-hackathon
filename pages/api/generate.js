import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "OpenAI API key not configured, please follow instructions in README.md",
      }
    });
    return;
  }

	console.log('req.body.script', req.body.script);
  const script = req.body.script || '';
  if (script.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a valid script",
      }
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
		console.log('completion===>', completion.data);
    res.status(200).json({ result: completion.data.choices[0].text });
  } catch(error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        }
      });
    }
  }
}

function generatePrompt(script) {
  console.log(script);
  return `
  Create clickup one or more stories with optional tasks from this script based on a js based react website built with next.js. Both stories and tasks should have acceptances criteria.
  ‘${script}’
  Generate your Answer with JSON format like this:
  {
    "stories": [
      {
        "name": string,
        "description": string,
        "time_estimate": integer,
        "tasks": [
          {
            "name": string,
            "description": string,
            "time_estimate": integer
          }
        ]
      }
    ]
  }
  please just reply JSON string formatted answer
  `
  }
