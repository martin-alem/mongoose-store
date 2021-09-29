require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();
const PORT = parseInt(process.env.PORT) || 8000;

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.json());

//Routes
app.get('/', (req, res) => {
    res.status(200).json({message: "Express app up and running"});
})

app.listen(PORT, () => {
    console.log("Express listening on port " + PORT);
});