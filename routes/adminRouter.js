const express = require("express");
const router = express.Router();
const { adminLoginView, adminLoginController, adminDashboardView, adminLogoutController } = require("../controller/adminController");
const { addProductView, addProductController, editProductView, editProductController, deleteProductController } = require("../controller/productController");
const { authorizeAdmin } = require("../auth/adminAuth");

router.route("/")
    .get(adminLoginView)
    .post(adminLoginController);

router.route("/logout")
    .get(adminLogoutController);

router.route("/dashboard")
    .get(authorizeAdmin, adminDashboardView);

router.route("/add_product")
    .get(authorizeAdmin, addProductView)
    .post(authorizeAdmin, addProductController);

router.route("/delete_product/:id")
    .delete(authorizeAdmin, deleteProductController);

router.route("/edit_product")
    .put(authorizeAdmin, editProductController);

router.route("/edit_product/:id")
    .get(authorizeAdmin, editProductView);

module.exports = router;