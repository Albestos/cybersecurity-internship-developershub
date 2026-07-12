
function check_logged(req, res) {
    if (req.session.logged == undefined || req.session.logged == false)
    {
        res.redirect("/login?returnurl=" + req.url);
        return false;
    }
    return true;
}
module.exports = check_logged;