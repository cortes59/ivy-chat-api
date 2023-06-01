const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.CHATGPT_API_KeY,
});
const openai = new OpenAIApi(configuration);

const app = express();
app.use(bodyParser.json());
app.use(cors())


app.post("/chat", async (req, res) => {
  const { prompt } = req.body;

  const completion = await openai.createCompletion({
    model: process.env.CHATGPT_MODEL,
    prompt: prompt,
  });
  res.send(completion.data.choices[0].text);
});

// Start the server
const port = process.env.PORT ||  8080;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});