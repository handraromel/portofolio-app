const helmetConfig = {
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", 'trustedscripts.com'],
            objectSrc: ["'none'"],
            upgradeInsecureRequests: [],
        },
    },
    frameguard: { action: 'deny' }, // Prevents clickjacking attacks
    hidePoweredBy: true, // Hides the X-Powered-By header
    hsts: {
        maxAge: 31536000, // Enforces HTTPS for one year
        includeSubDomains: true,
        preload: true,
    },
    ieNoOpen: true, // Sets X-Download-Options for IE8+
    noSniff: true, // Sets X-Content-Type-Options to nosniff
    xssFilter: true, // Sets X-XSS-Protection for basic XSS protection
}

module.exports = helmetConfig
