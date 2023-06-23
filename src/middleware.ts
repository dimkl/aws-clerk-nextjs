import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";
import { RequestCookies } from "next/dist/server/web/spec-extension/cookies";
import { NextResponse } from "next/server";

export default authMiddleware({
    beforeAuth: ({ headers, url, nextUrl, ...rest }) => {
        console.log(`${nextUrl.href} ${url} beforeAuth: `, JSON.stringify({
            origin: headers.get('origin'),
            host: headers.get('host'),
            forwardedPort: headers.get('x-forwarded-port'),
            forwardedHost: headers.get('x-forwarded-host'),
            forwardedProto: headers.get('x-forwarded-proto'),
            referrer: headers.get('referer'),
            userAgent: headers.get('user-agent'),
            CLERK_TRUST_HOST: process.env.CLERK_TRUST_HOST
        }));
        return NextResponse.next();
    },
    publicRoutes: ['/'],
    ignoredRoutes: ['/iframe'],
    debug: true
});

export const config = {
    matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
