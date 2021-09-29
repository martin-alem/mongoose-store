const mongoose = require('mongoose');

async function connectToDatabase(){
    const options = {keepAlive: true, keepAliveInitialDelay: 300000 };
    try {
        mongoose.connection.on("connecting", () => console.log("Connecting to Mongodb..."));
        mongoose.connection.on("connected", () => console.log("Connected to Mongodb successfully"));
        await mongoose.connect(process.env.MONGODB_URL, options);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

module.exports = connectToDatabase;
