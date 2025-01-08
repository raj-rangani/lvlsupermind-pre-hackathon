import { NextRequest, NextResponse } from "next/server";

//req is short for request
export async function GET(req: NextRequest) {
  const inputText = req.nextUrl.searchParams.get("inputText");
  const result = await fetch(
    "https://api.langflow.astra.datastax.com/lf/dbb0a37f-37ac-4f9f-872b-b33922eef9b9/api/v1/run/2de7e1d0-361d-45cb-8987-97b7605118e2?stream=false",
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.LANGFLOW_TOKEN ?? ""}`,
      },
      method: "POST",
      body: JSON.stringify({ input_value: inputText }),
    }
  ).then((res) => res.json());

  console.log(result);

  return NextResponse.json(result, { status: 200 });
}
