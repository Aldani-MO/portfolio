import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  matcher: [
    // Match all pathnames except static files and internals
    "/((?!_next|_vercel|opengraph-image|.*\\..*).*)",
  ],
};
