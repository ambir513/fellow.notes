import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function GET(req: NextRequest) {
    const session = await auth.api.getSession({
        headers: req.headers,
    });

    if (!session) {
        return NextResponse.json({ data: null }, { status: 401 });
    }

    return NextResponse.json({ data: session }, { status: 200 });
}