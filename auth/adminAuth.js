const Admin = require("./../model/Admin");
const { decryptCookie } = require("../utils/util");

async function authorizedAdmin(req, res, next) {
    const cookie = req.cookies["admin_access_token"];
    if(cookie){
        try{
            const decryptedCookie = await decryptCookie(cookie);
            const admin = JSON.parse(decryptedCookie);
            // I will perform a minimum check to make sure the token has not been tampered with.
            // We could also check if this user actually exists in the database
            if(admin["EX-email"] && admin["EX-password"] && admin["EX-auth"]){
                next();
            }
            else{
                res.redirect("/admin");
            }
        }catch(err){
            console.log(err);
            res.redirect("/error");
        }
    }
    else{
        res.redirect("/admin");
    }
}

module.exports = {authorizedAdmin};