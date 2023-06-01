import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export default authMiddleware({
    beforeAuth: ({ headers }) => {
        console.log({
            origin: headers.get('origin'),
            host: headers.get('host'),
            forwardedPort: headers.get('x-forwarded-port'),
            forwardedHost: headers.get('x-forwarded-host'),
            forwardedProto: headers.get('x-forwarded-proto'),
            referrer: headers.get('referer'),
            userAgent: headers.get('user-agent'),
        });
    },
    afterAuth: (auth, req) => {
        console.log('afterAuth: ', auth);
        if (!auth.userId && !auth.isPublicRoute) {
            return redirectToSignIn({ returnBackUrl: req.url });
        }
        return NextResponse.next();
    }
});

export const config = {
    matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};