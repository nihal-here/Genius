"use server";

import { auth } from "@clerk/nextjs/server";
import OpenAI from "openai";

import { checkApiLimit, IncreaseApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateImage(prompt: string, amount: string = "1", resolution: string = "512x512") {
  try {
    const { userId } = auth();

    if (!userId) {
      return { error: "Unauthorized", status: 401 };
    }

    if (!process.env.OPENAI_API_KEY) {
      return { error: "OpenAI API Key not configured", status: 500 };
    }

    if (!prompt) {
      return { error: "Prompt is required", status: 400 };
    }

    if (!amount) {
      return { error: "Amount is required", status: 400 };
    }

    if (!resolution) {
      return { error: "Resolution is required", status: 400 };
    }

    const freeTrial = await checkApiLimit();
    const isPro = await checkSubscription();

    if (!freeTrial && !isPro) {
      return { error: "Free trial has expired.", status: 403 };
    }

    const response = await openai.images.generate({
      prompt,
      n: parseInt(amount, 10),
      size: resolution as OpenAI.Images.ImageGenerateParams['size'],
    });

    if (!isPro) {
      await IncreaseApiLimit();
    }

    return { data: response.data };
  } catch (error) {
    console.log("[IMAGE_ERROR]", error);
    return { error: "Internal Error", status: 500 };
  }
}
