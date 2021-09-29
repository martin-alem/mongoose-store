require('dotenv').config();
const express = require('express');
const connectToDatabase = require("./database/connection");
const path = require('path');


//Connect to database
// connectToDatabase();

//controllers
const {signupViewController, signupController} = require("./controller/signupController");
const {loginViewController, loginController} = require("./controller/loginController")
const {homeController} = require("./controller/viewsController");

const app = express();
const PORT = parseInt(process.env.PORT) || 8000;

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({extended: true}));

//home route
app.get('/', homeController);

// Authentication Route
app.get("/signup", signupViewController);
app.post("/signup", signupController);

app.get('/login', loginViewController);
app.post("/login", loginController);

app.listen(PORT, () => {
    console.log("Express listening on port " + PORT);
});