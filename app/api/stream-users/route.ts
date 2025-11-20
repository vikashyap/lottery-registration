import { NextResponse } from "next/server";
import { Client } from "pg";

let client: Client | null = null;

async function getClient() {
  if (!client) {
    console.log("Connecting to Postgres...");
    client = new Client({ connectionString: process.env.DATABASE_URL });
    await client.connect();
    console.log("Postgres connected.");
  }
  return client;
}

export async function GET() {
  console.log("SSE Route: GET called");

  const client = await getClient();
  console.log("DATABASE_URL:", process.env.DATABASE_URL);

  const stream = new TransformStream();
  const writer = stream.writable.getWriter();

  client.on("notification", (msg) => {
    console.log("Notification received:", msg);

    if (msg.channel === "new_user_channel") {
      // Forward minimal notification as SSE event
      console.log("Triggered from insert");
      writer.write(`data: ${msg.payload}\n\n`);
    }
  });

  const listenRes = await client.query("LISTEN new_user_channel");
  console.log("LISTEN query executed.", listenRes);

  return new Response(stream.readable, {
    headers: {
      "Content-Type": "text/event-stream",
      Connection: "keep-alive",
      "Cache-Control": "no-cache",
    },
  });
}
