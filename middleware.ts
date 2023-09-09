import { authMiddleware } from "@clerk/nextjs";
//for me to able to send a request like get in postman
//i've to add the publicRoutes
export default authMiddleware({ publicRoutes: ["/api/:path*"] });

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
