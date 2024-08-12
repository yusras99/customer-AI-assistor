// app/api/chat.js

import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// Initialize OpenAI with your API key
const openai = new OpenAI(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);

// Sliding window size (number of previous messages to keep in context)
const SLIDING_WINDOW_SIZE = 5;

export async function POST(req) {
  try {
    // Parse the incoming request to get the user messages
    const { messages } = await req.json();

    // Create a sliding window of the last few messages
    const contextMessages = messages.slice(-SLIDING_WINDOW_SIZE);

    // Send the messages to the OpenAI API to get a completion
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' }, // System prompt
        ...contextMessages, // Pass the last few messages along with the system message
      ],
    });

    // Get the response from the completion
    const responseMessage = completion.choices[0].message.content;

    // Return the response as JSON
    return NextResponse.json({ response: responseMessage });
  } catch (error) {
    console.error('Error fetching AI response:', error);
    return NextResponse.json({ error: 'Failed to fetch AI response' }, { status: 500 });
  }
}
