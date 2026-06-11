import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const runtime = "nodejs";

export async function GET() {
  const filePath = path.join(process.cwd(), "src", "app", "static", "docs", "my_resume.pdf");

  if (!fs.existsSync(filePath)) {
    return new NextResponse("Resume file not found", { status: 404 });
  }

  try {
    const fileBuffer = fs.readFileSync(filePath);
    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'inline; filename="my_resume.pdf"',
      },
    });
  } catch (error) {
    console.error("Failed to read resume:", error);
    return new NextResponse("Failed to read resume file", { status: 500 });
  }
}
