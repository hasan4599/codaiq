import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

export const config = {
  matcher: ["/((?!_next).*)", "/"],
  unstable_allowDynamic: ["**/node_modules/@clerk/**"],
};
