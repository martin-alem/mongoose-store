const { verifyCookie } = require("../utils/util");

function authorizeAdmin(req, res, next) {
    if (Object.keys(req.cookies).length > 0) {
        let signedCookie = req.cookies["admin_auth_token"]?.["data"] || req.cookies?.["admin_auth_token"] || "";
        let hashedCookie = req.cookies["admin_access_token"] || "";
        signedCookie = Buffer.from(signedCookie);
        hashedCookie = hashedCookie;
        const authenticated = verifyCookie(hashedCookie, signedCookie);

        if (authenticated) {
            next();
        }
        else {
            res.redirect(301, "/admin");
        }
    }
    else {
        res.redirect(301, "/admin");
    }

}

module.exports = { authorizeAdmin };