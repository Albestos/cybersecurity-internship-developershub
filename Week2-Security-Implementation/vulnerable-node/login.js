var log4js = require("log4js");
var url = require("url");
var express = require('express');
var auth = require("../model/auth");
var validator = require("validator");  // ADD THIS
var router = express.Router();

var logger = log4js.getLogger('vnode')

// Login template
router.get('/login', function(req, res, next) {

    var url_params = url.parse(req.url, true).query;

    res.render('login', {returnurl: url_params.returnurl, auth_error: url_params.error});
});


// Do auth
router.post('/login/auth', function(req, res) {

    var user = req.body.username;
    var password = req.body.password;
    var returnurl = req.body.returnurl;

    // ADD THESE VALIDATION CHECKS
    if (!user || validator.isEmpty(user.trim())) {
        return res.redirect("/login?error=Username is required");
    }
    if (!password || validator.isEmpty(password.trim())) {
        return res.redirect("/login?error=Password is required");
    }
    if (!validator.isLength(user, { min: 3, max: 50 })) {
        return res.redirect("/login?error=Invalid username length");
    }
    // Sanitize - strip any html tags
    user = validator.escape(user);

    logger.error("Tried to login attempt from user = " + user);

   auth(user, password)
    .then(function (data) {
        console.log("Auth success, setting session");
        req.session.logged = true;
        req.session.user_name = user;

        // Generate JWT token
        var jwt = require('jsonwebtoken');
        var token = jwt.sign(
            { id: data.id, username: user },
            req.app.get('JWT_SECRET'),
            { expiresIn: '1h' }
        );
        req.session.token = token;
        console.log("JWT token generated");

        if (returnurl == undefined || returnurl == "" || returnurl == "undefined"){
            returnurl = "/";
        }

        return res.redirect(returnurl);
    })

});

// Do logout
router.get('/logout', function(req, res, next) {

    req.session.logged = false;
    req.session.user = null;

    res.redirect("/login")
});

module.exports = router;