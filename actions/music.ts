"use server";

import { auth } from "@clerk/nextjs/server";
import Replicate from "replicate";

import { checkApiLimit, IncreaseApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN!,
});

export async function generateMusic(prompt: string) {
  try {
    const { userId } = auth();

    if (!userId) {
      return { error: "Unauthorized", status: 401 };
    }

    if (!process.env.REPLICATE_API_TOKEN) {
      return { error: "Replicate API Key not configured", status: 500 };
    }

    if (!prompt) {
      return { error: "Prompt is required", status: 400 };
    }

    const freeTrial = await checkApiLimit();
    const isPro = await checkSubscription();

    if (!freeTrial && !isPro) {
      return { error: "Free trial has expired.", status: 403 };
    }

    const response = await replicate.run(
      "riffusion/riffusion:8cf61ea6c56afd61d8f5b9ffd14d7c216c0a93844ce2d82ac1c9ecc9c7f24e05",
      {
        input: {
          prompt_a: prompt
        }
      }
    );

    if (!isPro) {
      await IncreaseApiLimit();
    }

    return { data: response };
  } catch (error) {
    console.log("[MUSIC_ERROR]", error);
    return { error: "Internal Error", status: 500 };
  }
}
