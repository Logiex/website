import { authMiddleware } from "@clerk/nextjs";
 
export default authMiddleware({
  ignoredRoutes:["((?!^/polls/create).*)"],
  
});
 
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};