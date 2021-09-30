require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const methodOverride = require("method-override");
const connectToDatabase = require("./database/connection");
const path = require('path');


//Connect to database
connectToDatabase();

const indexRouter = require("./routes/indexRouter");
const adminRouter = require("./routes/adminRouter");

const app = express();
const PORT = parseInt(process.env.PORT) || 8000;

app.use(methodOverride('_method'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '/public')));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));


//index Router
app.use("/", indexRouter);

//Admin Router
app.use("/admin", adminRouter);

app.all("*", (req, res) => {
    res.status(404).render("error");
});

app.listen(PORT, () => {
    console.log("Express listening on port " + PORT);
})