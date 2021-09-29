const {encryptCookie} = require("../utils/util");

async function signupController(req, res){

    const cookieValue = JSON.stringify({"EX-email":req.body.email, "EX-password":req.body.password, "EX-auth":true});
    const hashedCookieValue = await encryptCookie(cookieValue);
    res.cookie("access_token", hashedCookieValue, {expires: new Date(Date.now() + 1 * 3600000), sameSite: true});
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