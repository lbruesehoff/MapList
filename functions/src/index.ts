import * as v2 from "firebase-functions/v2";
import { SecretManagerServiceClient } from "@google-cloud/secret-manager";

// Cloud Function to get API key from Secret Manager
export const getApiKey = v2.https.onRequest(async (request, response) => {
  // Add CORS headers
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  response.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle OPTIONS preflight request
  if (request.method === "OPTIONS") {
    response.status(204).send("");
    return;
  }

  try {
    const secretName = request.query.secretName as string;
    if (!secretName) {
      response.status(400).send("Missing secretName query parameter.");
      return;
    }

    const client = new SecretManagerServiceClient();
    const [version] = await client.accessSecretVersion({ name: secretName });
    const payload = version.payload?.data?.toString();

    if (!payload) {
      response.status(404).send("Secret not found or empty.");
      return;
    }

    response.send({ apiKey: payload });
  } catch (error) {
    response.status(500).send(`Error: ${(error as Error).message}`);
  }
});
