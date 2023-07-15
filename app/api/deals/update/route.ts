import { NextResponse } from "next/server";

async function POST(request: Request) {

  const data = await request.json();

  console.log(data)

}
