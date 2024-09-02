// function(image, query): response

import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { image, query } = await request.json();

  const response = await fetch(`http://localhost:3000/api/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ image, query }),
  });

  return NextResponse.json({ response: "response" });
}
