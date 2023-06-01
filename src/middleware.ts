import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";
import { RequestCookies } from "next/dist/server/web/spec-extension/cookies";
import { NextResponse } from "next/server";

export default authMiddleware({
    beforeAuth: ({ headers, cookies, nextUrl }) => {
        console.log(`${nextUrl.href}  headers: `, serializeHeaders(headers));
        console.log(`${nextUrl.href}  cookies: `, serializeCookies(cookies));
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
            return redirectToSignIn({ returnBackUrl: req.url });
        }
        return NextResponse.next();
    }
});

export const config = {
    matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};

function serializeHeaders(headers: Headers) {
    const h: Record<string, string> = {};
    headers.forEach((value, key) => h[key] = value);
    return JSON.stringify(h);
}

function serializeCookies(cookies: RequestCookies) {
    return JSON.stringify(cookies.getAll());
}