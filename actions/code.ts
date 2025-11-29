"use server";

import { auth } from "@clerk/nextjs/server";
import OpenAI from "openai";

import { checkApiLimit, IncreaseApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const instructionMessage: OpenAI.Chat.ChatCompletionMessageParam = {
  role: "system",
  content: "You are a code generator. You must answer only in markdown code snippets. Use code comments for explanations."
};

export async function generateCode(messages: OpenAI.Chat.ChatCompletionMessageParam[]) {
  try {
    const { userId } = auth();

    if (!userId) {
      return { error: "Unauthorized", status: 401 };
    }

    if (!process.env.OPENAI_API_KEY) {
      return { error: "OpenAI API Key not configured", status: 500 };
    }

    if (!messages) {
      return { error: "Messages are required", status: 400 };
    }

    const freeTrial = await checkApiLimit();
    const isPro = await checkSubscription();

    if (!freeTrial && !isPro) {
      return { error: "Free trial has expired.", status: 403 };
    }

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [instructionMessage, ...messages]
    });

    if (!isPro) {
      await IncreaseApiLimit();
    }

    return { data: response.choices[0].message };
  } catch (error) {
    console.log("[CODE_ERROR]", error);
    return { error: "Internal Error", status: 500 };
  }
}
