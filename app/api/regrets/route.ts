import { getRegrets } from "@/actions/regrets";
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
