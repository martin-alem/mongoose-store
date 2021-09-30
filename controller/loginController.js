const User = require("./../model/User");
const { hashData, signCookie } = require("../utils/util");

async function loginController(req, res) {

    const data = req.body;
    if (validatePayload(data)) {

        try {
            const result = await User.findOne({ email: data.email });
            if (result !== null) {
                if (data["password"] === result["password"]) {
                    const cookieValue = JSON.stringify({ "EX-email": data.email, "EX-password": data.password, "EX-auth": true });
                    const hashedCookieValue = hashData(cookieValue);
                    const signedCookie = signCookie(hashedCookieValue);
                    res.cookie("access_token", hashedCookieValue, { expires: new Date(Date.now() + 1 * 3600000), sameSite: true });
                    res.cookie("auth_token", signedCookie, { expires: new Date(Date.now() + 1 * 3600000), sameSite: true });
                    const currentUser = `auth-true`;
                    res.cookie("auth", currentUser, { expires: new Date(Date.now() + 1 * 3600000), sameSite: true });
                    res.redirect(301, "/");
                } else {
                    res.redirect("/login?error=Invalid email or password");
                }
            } else {
                res.redirect("/login?error=Invalid email or password");
            }
        } catch (err) {
            console.log(err);
            res.redirect("/error");
        }
    } else {
        res.redirect("/login?error=Please provide all required fields");
    }
}

function validatePayload(payload) {
    if (Object.keys(payload).length > 0) {
        if (payload["email"] && payload["password"]) {
            if (payload["email"] !== "" && payload["password"] !== "") {
                return true;
            }
        }
    }

    return false;
}


function logoutController(req, res) {
    res.clearCookie("access_token");
    res.clearCookie("auth_token");
    res.clearCookie("auth");
    res.redirect("/");
}

function loginViewController(req, res) {
    res.status(200).render('login');
}

module.exports = { loginViewController, loginController, logoutController };