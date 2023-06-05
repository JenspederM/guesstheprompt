import * as functions from "firebase-functions";
import { Configuration, OpenAIApi, CreateImageRequest } from "openai";

const generateImage = functions
  .runWith({ secrets: ["OPENAI_API_KEY"] })
  .https.onCall(async (data: CreateImageRequest, context) => {
    if (!context.auth) {
      return;
    }
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY?.replace(/"/g, ""),
    });

    const api = new OpenAIApi(configuration);

    functions.logger.info(
      "Generating image with:",
      { data },
      {
        structuredData: true,
      }
    );

    if (!data.prompt) {
      return;
    }

    const response = await api
      .createImage({
        prompt: data.prompt,
        n: data.n || 1,
        size: data.size || "256x256",
        response_format: data.response_format || "url",
        user: data?.user,
      })
      .then((resp) => resp.data)
      .catch((err) => {
        functions.logger.error(err, { structuredData: true });
        return;
      });

    if (!response) {
      return;
    }

    return response;
  });

const getModeration = functions
  .runWith({ secrets: ["OPENAI_API_KEY"] })
  .https.onCall(async (data, context) => {
    if (!context.auth) {
      return;
    }
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY?.replace(/"/g, ""),
    });

    const api = new OpenAIApi(configuration);

    functions.logger.info(
      "Getting moderation for:",
      { data },
      {
        structuredData: true,
      }
    );

    if (!data.input) {
      return;
    }

    const response = await api
      .createModeration({ input: data.input })
      .then((resp) => resp.data)
      .catch((err) => {
        functions.logger.error(err, { structuredData: true });
        return;
      });

    if (!response) {
      return;
    }

    return response;
  });

export const openai = {
  generateImage,
  getModeration,
};