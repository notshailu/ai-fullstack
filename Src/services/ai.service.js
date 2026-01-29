const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY, // ⚠️ env use karo
});

const stylePrompts = {
  instagram_post:
    "Write a short, catchy Instagram post caption. Use a conversational tone, 1–2 emojis max, and no hashtags.",
  instagram_reel:
    "Write an engaging Instagram Reel caption. Hook in the first few words, feel high-energy, and you may add 2–4 short hashtags at the end.",
  youtube_title:
    "Write a punchy YouTube video title in less than 70 characters. No hashtags or emojis.",
  youtube_description:
    "Write a concise YouTube description intro (1–2 sentences) that teases the content and encourages watching, no timestamps or links.",
  linkedin_post:
    "Write a professional yet friendly LinkedIn-style caption in 1–2 sentences, no hashtags, no emojis.",
};

const generateCaption = async (base64ImageFile, style = "instagram_post") => {
  const styleInstruction =
    stylePrompts[style] ||
    "Write a short, impactful social media caption in one line.";

  const contents = [
    {
      inlineData: {
        mimeType: "image/png",
        data: base64ImageFile,
      },
    },
    {
      text: `Caption this image. ${styleInstruction}`,
    },
  ];

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents,
    config: {
      systemInstruction:
        "You are an advanced AI caption specialist skilled at understanding visual context and crafting impactful captions tailored to the requested platform style.",
    },
  });

  return response.candidates[0].content.parts[0].text;
};

module.exports = generateCaption;
