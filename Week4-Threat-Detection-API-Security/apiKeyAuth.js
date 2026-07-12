var config = require('../config');

function apiKeyAuth(req, res, next) {
    // Allow already-authenticated browser sessions through without requiring an API key
    if (req.session && req.session.logged) {
        return next();
    }

    var providedKey = req.headers['x-api-key'];

    if (!providedKey || providedKey !== config.apiKey) {
        return res.status(401).json({ message: "Unauthorized: missing or invalid API key" });
    }

    next();
}

module.exports = apiKeyAuth;