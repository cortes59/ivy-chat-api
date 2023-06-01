module.exports.formatPromptSearch = (prompt = "") => {
  if (!prompt) return "";

  // More logic to normalize search text
  return prompt.toLowerCase().trim();
};
