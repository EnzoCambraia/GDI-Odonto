// import {
//   NextResponse,
//   type MiddlewareConfig,
//   type NextRequest,
// } from "next/server";

// interface RouteConfig {
//   path: string;
//   whenAuthenticated: "redirect" | "allow";
//   whenNotAuthenticated?: "redirect" | "allow";
// }

// const routes: RouteConfig[] = [
//   {
//     path: "/sign-in",
//     whenAuthenticated: "redirect",
//     whenNotAuthenticated: "allow",
//   },
//   {
//     path: "/sign-up",
//     whenAuthenticated: "redirect",
//     whenNotAuthenticated: "allow",
//   },
//   {
//     path: "/",
//     whenAuthenticated: "allow",
//     whenNotAuthenticated: "allow",
//   },
// ];

// const PROTECTED_ROUTE_PATTERNS = [
//   "/dashboard",
//   "/equipamentos",
//   "/gerenciamento"
// ];

// export function middleware(request: NextRequest) {
//   const path = request.nextUrl.pathname;
//   const authToken = request.cookies.get("token");
//   const isAuthenticated = !!authToken;

//   const routeConfig = routes.find((route) => route.path === path);

//   const isProtectedRoute = PROTECTED_ROUTE_PATTERNS.some((pattern) =>
//     path.startsWith(pattern)
//   );

//   if (isAuthenticated) {
//     if (routeConfig?.whenAuthenticated === "redirect") {
//       return NextResponse.redirect(new URL("/dashboard", request.url));
//     }

//     return NextResponse.next();
//   } else {
//     if (isProtectedRoute) {
//       return NextResponse.redirect(new URL("/sign-in", request.url));
//     }

//     return NextResponse.next();
//   }
// }

// export const config: MiddlewareConfig = {
//   matcher: [
//     "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
//   ],
// };
