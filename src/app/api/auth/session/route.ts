import { NextResponse } from "next/server";
import { readSession } from "@/lib/api/server/session";

/** The logged-in admin for the shell (display data from the cookie). */
export async function GET(): Promise<NextResponse> {
  const session = await readSession();
  if (!session?.user) {
    return NextResponse.json({ success: false, error: { code: "UNAUTHORIZED", message: "Not logged in" } }, { status: 401 });
  }
  return NextResponse.json({ success: true, data: session.user });
}
