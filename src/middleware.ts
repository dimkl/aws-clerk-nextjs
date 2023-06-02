import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";
import { RequestCookies } from "next/dist/server/web/spec-extension/cookies";
import { NextResponse } from "next/server";

export default authMiddleware({
    beforeAuth: ({ headers, url, nextUrl }) => {
        console.log(`${nextUrl.href} ${url}`);
        console.log(`${nextUrl.href}  beforeAuth: `, JSON.stringify({
            origin: headers.get('origin'),
            host: headers.get('host'),
            forwardedPort: headers.get('x-forwarded-port'),
            forwardedHost: headers.get('x-forwarded-host'),
            forwardedProto: headers.get('x-forwarded-proto'),
            referrer: headers.get('referer'),
            userAgent: headers.get('user-agent'),
        }));
        return NextResponse.next();
    },
    afterAuth: (auth, req) => {
        console.log(`${req.nextUrl.href}  afterAuth: `, JSON.stringify(auth));
        if (!auth.userId && !auth.isPublicRoute) {
            console.log(`${req.nextUrl.href}  redirectToSignIn(${req.url}): `, JSON.stringify(req.cookies.get('__session')));
            return redirectToSignIn({ returnBackUrl: req.url });
        }
        return NextResponse.next();
    },
    publicRoutes: ['/'],
    debug: true
});

export const config = {
    matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
