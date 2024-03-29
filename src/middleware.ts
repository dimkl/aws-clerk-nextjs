import { authMiddleware } from "@clerk/nextjs/server";
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
