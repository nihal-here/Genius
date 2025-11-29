"use server";

import { auth } from "@clerk/nextjs";
import Replicate from "replicate";

import { checkApiLimit, increaseApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN!,
});

export async function generateVideo(prompt: string) {
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
      "anotherjesse/zeroscope-v2-xl:9f747673945c62801b13b8470acab993529718427f48e32b666047c6b252b429",
      {
        input: {
          prompt
        }
      }
    );

    if (!isPro) {
      await increaseApiLimit();
    }

    return { data: response };
  } catch (error) {
    console.log("[VIDEO_ERROR]", error);
    return { error: "Internal Error", status: 500 };
  }
}
