const mongoose = require('mongoose');

require("dotenv").config();

function dbConnect () {
    mongoose.connect(process.env.DATABASE_URL)
    .then(() => console.log("Connection Sucessful") ) 
    .catch((error) => {
        console.log("Recieved an Error");
        console.error(error.message);
        process.exit(1);
    } ) 
}

module.exports = dbConnect;
