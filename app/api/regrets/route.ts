import { createRegret, getRegrets } from "@/actions/regrets";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await getRegrets();

    if (!res.success) {
      return NextResponse.json({ message: res.message }, { status: 500 });
    }

    return NextResponse.json(res.data, { status: 200 });
  } catch {
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const hasMessage = typeof body?.message === "string" && body.message.trim().length > 0;
    const hasCanvas = typeof body?.canvas === "object" && body.canvas !== null;

    if (!hasMessage && !hasCanvas) {
      return NextResponse.json({ message: "Message or canvas is required" }, { status: 400 });
    }

    const res = await createRegret(body);

    if (!res.success) {
      return NextResponse.json({ message: res.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data: res.data }, { status: 201 });
  } catch {
    return NextResponse.json({ message: "Invalid request body" }, { status: 400 });
  }
}
