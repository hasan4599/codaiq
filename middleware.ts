import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export default clerkMiddleware((auth, request) => {
  try {
    // Let Clerk handle the authentication
    return NextResponse.next();
  } catch (error) {
    console.error("Clerk middleware error:", error);
    return NextResponse.next();
  }
});

export const config = {
  matcher: ["/((?!_next).*)", "/"],
};
