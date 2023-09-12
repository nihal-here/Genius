import { auth } from '@clerk/nextjs';

import { NextResponse } from 'next/server';

import OpenAI from 'openai';
import { IncreaseApiLimit, checkApiLimit } from '@/lib/api-limit';
import { checkSubscription } from '@/lib/subscription';


const openai = new OpenAI({

  apiKey: process.env.OPENAI_API_KEY,

});

const instructionMessage: OpenAI.Chat.ChatCompletionMessage = {
  role: "system",
  content: "As a code generator , your task is to provide Markdown code snippets along with code comments to explain them. Given a programming task or question, respond with clear and concise code examples in Markdown format. Remember to include comments to clarify the code's functionality and purpose."
}

export async function POST(req: Request) {

  try {

    const { userId } = auth();

    const body = await req.json();

    const { messages } = body;



    if (!userId) {

      return new NextResponse('Unauthorized', { status: 401 });

    }

    if (!openai.apiKey) {

      return new NextResponse('OpenAI API Key not configured', { status: 500 });

    }

    if (!messages) {

      return new NextResponse('Messages are required', { status: 400 });

    }
    const freeTrial = await checkApiLimit();
    const isPro=await checkSubscription();

    if(!freeTrial && !isPro){
      return new NextResponse("You have reached your free trial limit", { status: 403 }
    );}


    const response = await openai.chat.completions.create({

      model: 'gpt-3.5-turbo',

      messages:[instructionMessage,...messages]

    });

    if(!isPro){
    await IncreaseApiLimit();
    }

    return NextResponse.json(response.choices[0].message);

  } catch (error) {

    console.log('[CODE_ERROR]', error);

    return new NextResponse('Internal error', { status: 500 });

  }

}
