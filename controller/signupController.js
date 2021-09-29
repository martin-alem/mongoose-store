const {encryptCookie} = require("../utils/util");

async function signupController(req, res){

    const cookieValue = `${req.body["email"]}-${req.body["password"]}`;
    const hashedCookieValue = await encryptCookie(cookieValue);
    res.cookie("access_token", hashedCookieValue, {expires: new Date(Date.now() + 1 * 36000), sameSite: true});
    res.status(201).json({
        "status": "success",
        "statusCode": 201,
        "message": "user created",
        "data": req.body
    });
}

function signupViewController(req, res){
    res.status(200).render('signup');
}

module.exports = {signupViewController, signupController};