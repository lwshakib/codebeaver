import { NextRequest, NextResponse } from "next/server";
import { getSignedReadUrl } from "@/lib/s3";

/**
 * GET /api/s3/signed-url
 * Query Params: path
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const path = searchParams.get("path");

    if (!path) {
      return NextResponse.json(
        { error: "path is required" },
        { status: 400 }
      );
    }

    const data = await getSignedReadUrl(path);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error generating signed read URL:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
