const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const { Configuration, OpenAIApi } = require("openai");
const { formatPromptSearch } = require("./utils/formatSearch");
const prisma = require("./services/prismaClient");

const configuration = new Configuration({
  apiKey: process.env.CHATGPT_API_TOKEN,
});
const openai = new OpenAIApi(configuration);

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post("/chat", async (req, res) => {
  const { prompt } = req.body;

  // first try to find cached answers
  const formattedPrompt = formatPromptSearch(prompt);
  const existingPrompts = await prisma.prompt.findFirst({
    where: {
      promptSearch: formattedPrompt,
    },
  });

  if (existingPrompts) return res.json({ answer: existingPrompts.answer });

  const completion = await openai.createCompletion({
    model: process.env.CHATGPT_MODEL,
    prompt: prompt,
  });

  const answer = completion.data.choices[0].text;

  await prisma.prompt.create({
    data: {
      prompt,
      promptSearch: formattedPrompt,
      answer,
    },
  });

  return res.json({ answer });
});

// Start the server
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
