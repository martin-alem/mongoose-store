const express = require('express');
const router = express.Router();

const { signupViewController, signupController } = require("../controller/signupController");
const { loginViewController, loginController, logoutController } = require("../controller/loginController")
const { homeController, productDetailController } = require("../controller/viewsController");
const { createOrderController } = require("../controller/orderController");


router.route("/")
    .get(homeController);

router.route("/signup")
    .get(signupViewController)
    .post(signupController);

router.route("/login")
    .get(loginViewController)
    .post(loginController);

router.route("/logout")
    .get(logoutController);

router.route("/product_detail/:id")
    .get(productDetailController);
    
router.route("/order/:id")
    .post(createOrderController);

module.exports = router;