require('dotenv').config();
const express = require('express');
const path = require('path');

//controllers
const {signupViewController} = require("./controller/signupController");

const app = express();
const PORT = parseInt(process.env.PORT) || 8000;

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.json());

// Authentication Route
app.get("/signup", signupViewController);

app.listen(PORT, () => {
    console.log("Express listening on port " + PORT);
});