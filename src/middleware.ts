import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
    beforeAuth: ({ headers }) => {
        console.log({
            origin: headers.get('origin') || undefined,
            host: headers.get('host') as string,
            forwardedPort: headers.get('x-forwarded-port') || undefined,
            forwardedHost: headers.get('x-forwarded-host') || undefined,
            referrer: headers.get('referer') || undefined,
            userAgent: headers.get('user-agent') || undefined,
        });
    }
});

export const config = {
    matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};