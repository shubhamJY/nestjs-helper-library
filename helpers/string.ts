export function slugify(str: string) {
    str = str.replace(/^\s+|\s+$/g, ""); // trim leading/trailing white space
    str = str.toLowerCase(); // convert string to lowercase
    str = str
        .replace(/[^a-z0-9 -]/g, "") // remove any non-alphanumeric characters
        .replace(/\s+/g, "-") // replace spaces with hyphens
        .replace(/-+/g, "-"); // remove consecutive hyphens
    return str;
}

export function makeReqObj(req: any) {
    return {
        ip: req.ip || "",
        headers: req.headers,
        userAgent: req.headers["user-agent"],
        path: req.path || "",
        query: req.query,
        body: req.body,
        cookies: req.cookies,
        user: req.user ? req.user.data : null,
        params: req.params,
        originalUrl: req.originalUrl || "",
        method: req.method || "",
        referer: req.headers.referer || "",
        protocol: req.protocol || "",
        secure: req.secure || "",
        hostname: req.hostname || "",
        subdomains: req.subdomains || [],
        fresh: req.fresh || "",
        stale: req.stale || "",
        signedCookies: req.signedCookies,
        signedCookiesMaxAge: req.signedCookiesMaxAge,
        url: req.url || "",
        route: req.route || {},
    };
}
