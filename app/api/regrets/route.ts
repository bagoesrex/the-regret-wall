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

    if (!body?.type) {
      return NextResponse.json({ message: "Type is required" }, { status: 400 });
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
