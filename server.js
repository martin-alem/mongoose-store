require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser')
const connectToDatabase = require("./database/connection");
const path = require('path');


//Connect to database
connectToDatabase();

//controllers
const { signupViewController, signupController } = require("./controller/signupController");
const { loginViewController, loginController, logoutController } = require("./controller/loginController")
const { homeController } = require("./controller/viewsController");
const { adminLoginView, adminLoginController, adminDashboardView, adminLogoutController } = require("./controller/adminController");
const { addProductView, addProductController } = require("./controller/productController");
const { authorizeAdmin } = require("./auth/adminAuth");

const app = express();
const PORT = parseInt(process.env.PORT) || 8000;

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '/public')));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

//home route
app.get('/', homeController);

// Authentication Route
app.get("/signup", signupViewController);
app.post("/signup", signupController);

app.get('/login', loginViewController);
app.post("/login", loginController);
app.get("/logout", logoutController);


//admin
app.get('/admin', adminLoginView);
app.post("/admin", adminLoginController);
app.get("/admin/dashboard", authorizeAdmin, adminDashboardView);
app.get("/admin/logout", adminLogoutController);


//product
app.get("/add_product", authorizeAdmin, addProductView);
app.post("/add_product", addProductController);


app.all("*", (req, res) => {
    res.status(404).render("error");
})

app.listen(PORT, () => {
    console.log("Express listening on port " + PORT);
});