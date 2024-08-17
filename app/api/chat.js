// app/api/chat.js

import { NextResponse } from "next/server";
import OpenAI from "openai";

const systemPrompt = `
You are a customer service chatbot designed to provide empathetic and supportive assistance to users seeking help or moral support. Your primary goal is to create a comforting and reassuring environment where users feel heard and valued. Here’s how you should approach your interactions:

Empathy and Understanding: Always respond with empathy and understanding. Acknowledge the user's feelings and emotions, and offer reassurance and support. Use a compassionate tone and avoid judgmental language.
Active Listening: Pay close attention to what the user is saying. Reflect their feelings back to them to show that you are genuinely listening and understanding their concerns.
Offer Practical Assistance: Provide helpful information or solutions where appropriate, such as resources for mental health support or practical steps they can take to address their concerns.
Encouragement: Offer words of encouragement and positive reinforcement. Help users feel empowered and capable of overcoming their challenges.
Respect Privacy: Ensure that you respect the user’s privacy and personal information. Do not ask for or store sensitive information unless absolutely necessary and with clear consent.
Guidance on Limits: If the conversation reaches a point where professional human intervention is required, gently guide the user towards seeking help from a qualified professional or support service.
Stay Positive: Maintain a positive and uplifting tone throughout the interaction. Avoid negative language and focus on providing hope and encouragement.
Confidentiality: Ensure that all interactions are handled with confidentiality and respect. Users should feel safe and secure sharing their concerns with you.
Your goal is to create a supportive space where users can express themselves and receive the assistance and encouragement they need.
`;
// Sliding window size (number of previous messages to keep in context)
const SLIDING_WINDOW_SIZE = 5;

export async function POST(req) {
  try {
    const openai = new OpenAI({
      baseURL: "https://openrouter.ai/api/v1",
      apiKey: process.env.OPENROUTER_API_KEY, // Use process.env to access environment variables securely
      defaultHeaders: {
        "HTTP-Referer": "http://localhost:3000/", // Optional, for including your app on openrouter.ai rankings.
        "X-Title": "Empathetic_Chat_Assistant", // Optional. Shows in rankings on openrouter.ai.
      },
    }); // Create a new instance of the OpenAI client

    const data = await req.json(); // Parse the JSON body of the incoming request

    // Validate that data is an array
    if (!Array.isArray(data)) {
      throw new Error("Invalid input: data should be an array of messages.");
    }

    // Create a sliding window of the last few messages
    const contextMessages = messages.slice(-SLIDING_WINDOW_SIZE);

    // Create a chat completion request to the OpenAI API
    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: systemPrompt }, ...contextMessages], // Include the system prompt and user messages
      model: "meta-llama/llama-3.1-8b-instruct:free", // Specify the model to use
      stream: true, // Enable streaming responses
    });

    // Create a ReadableStream to handle the streaming response
    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder(); // Create a TextEncoder to convert strings to Uint8Array
        try {
          // Iterate over the streamed chunks of the response
          for await (const chunk of completion) {
            const content = chunk.choices[0]?.delta?.content; // Extract the content from the chunk
            if (content) {
              const text = encoder.encode(content); // Encode the content to Uint8Array
              controller.enqueue(text); // Enqueue the encoded text to the stream
            }
          }
        } catch (err) {
          controller.error(err); // Handle any errors that occur during streaming
        } finally {
          controller.close(); // Close the stream when done
        }
      },
    });

    return new NextResponse(stream); // Return the stream as the response
  } catch (error) {
    console.error("Error in POST /api/chat:", error); // Log the error for debugging
    return NextResponse.json({ error: error.message }, { status: 400 }); // Return a 400 Bad Request response with the error message
  }
}

// // Initialize OpenAI with your API key
// const openai = new OpenAI(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);

// // Sliding window size (number of previous messages to keep in context)
// // const SLIDING_WINDOW_SIZE = 5;

// export async function POST(req) {
//   try {
//     // Parse the incoming request to get the user messages
//     const { messages } = await req.json();

//     // Create a sliding window of the last few messages
//     const contextMessages = messages.slice(-SLIDING_WINDOW_SIZE);

//     // Send the messages to the OpenAI API to get a completion
//     const completion = await openai.chat.completions.create({
//       model: 'gpt-4',
//       messages: [
//         { role: 'system', content: 'You are a helpful assistant.' }, // System prompt
//         ...contextMessages, // Pass the last few messages along with the system message
//       ],
//     });

//     // Get the response from the completion
//     const responseMessage = completion.choices[0].message.content;

//     // Return the response as JSON
//     return NextResponse.json({ response: responseMessage });
//   } catch (error) {
//     console.error('Error fetching AI response:', error);
//     return NextResponse.json({ error: 'Failed to fetch AI response' }, { status: 500 });
//   }
// }
