const Admin = require("./../model/Admin");
const { encryptCookie } = require("../utils/util");

async function adminLoginController(req, res) {
  const data = req.body;

  try {
    if (data.username !== "" && data.password !== "") {
      const result = await Admin.findOne({ username: data.username });
      if (result !== null) {
        if (
          data.username === result.userName &&
          data.password === result.password
        ) {
          const cookieValue = JSON.stringify({
            "EX-email": data.username,
            "EX-password": data.password,
            "EX-auth": true,
          });
          const hashedCookieValue = await encryptCookie(cookieValue);
          res.cookie("admin_access_token", hashedCookieValue, {
            expires: new Date(Date.now() + 0.5 * 3600000),
            sameSite: true,
          });
          res.redirect(301, "/admin/dashboard");
        } else {
          res.redirect(301, "/admin?error=Invalid credentials");
        }
      } else {
        res.redirect(301, "/admin?error=Invalid credentials");
      }
    } else {
      res.redirect(301, "/admin?error=Provide all required credentials");
    }
  } catch (err) {
      res.redirect(301, "/error");
  }
}

function adminLogoutController(req, res) {
  res.clearCookie("admin_access_token");
  res.redirect("/admin");
}

function adminLoginView(req, res) {
  res.status(200).render("admin");
}

function adminDashboardView(req, res) {
  res.status(200).render("dashboard");
}

module.exports = {
  adminLoginView,
  adminLoginController,
  adminDashboardView,
  adminLogoutController,
};
