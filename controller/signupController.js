const {hashData, signCookie} = require("../utils/util");
const User = require("../model/User");

async function signupController(req, res){
    const data = req.body;
    if(validatePayload(data)){
        try {
            //make sure user does not already exists
            const result = await User.findOne({email: data.email});
        
            if(result === null){
                const cookieValue = JSON.stringify({"EX-email":data.email, "EX-password":data.password, "EX-auth":true});
                const hashedCookieValue = await encryptCookie(cookieValue);
                const userData = {firstName: data["first_name"], lastName: data["last_name"], email: data["email"], password: data["password"]};
                User.create(userData, (error, document) =>{
                    if(error) {
                        res.redirect("/signup?error=An error has occurred");
                    }else{
                        res.cookie("access_token", hashedCookieValue, {expires: new Date(Date.now() + 1 * 3600000), sameSite: true});
                        const currentUser = `auth-true`;
                        res.cookie("auth", currentUser, {expires: new Date(Date.now() + 1 * 3600000), sameSite: true});
                        res.redirect(301, "/");
                    }
                })
            }else{
                res.redirect("/signup?error=A user already exist with the email address");
            }
        
            } catch (error) {
                res.redirect("/error");
            }
    }else{
        res.redirect("/signup?error=Please provide all required fields");
    }
}

function validatePayload(payload) {
    if(Object.keys(payload).length > 0) {
        if(payload["first_name"] && payload["last_name"] && payload["email"] && payload["password"]){
            if(payload["first_name"] !== "" && payload["last_name"] !== "" && payload["email"] !== "" && payload["password"] !== ""){
                return true;
            }
        }
    }

    return false;
}

function signupViewController(req, res){
    res.status(200).render('signup');
}

module.exports = {signupViewController, signupController};