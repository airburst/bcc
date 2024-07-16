import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

/**
 * THIS IS A PERMENENT REDIRECT TO bcc-rides.vercel.app
 */
const REDIRECT_URL = "https://bcc-rides.vercel.app";

export function middleware(request: NextRequest) {
  return NextResponse.redirect(new URL(REDIRECT_URL, request.url));
}

// No matcher is needed since we want to redirect all requests
// export const config = {
//   matcher: "/*",
// };
