import { NextResponse } from "next/server";
import * as dotenv from "dotenv";
import OpenAI from "openai";
import { env } from "../../../config/env";

dotenv.config();

const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY,
});

export async function POST(req) {
  try {
    const data = await req.formData();
    const body = Object.fromEntries(data);
    const messages = JSON.parse(body.messages);
    const completion = await openai.chat.completions.create({
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        ...messages,
      ],
      model: "gpt-4-turbo-preview",
    });

    return NextResponse.json({ answer: completion.choices[0].message.content });
  } catch (error) {
    console.error("Error processing audio:", error);
    return NextResponse.error();
  }
}
