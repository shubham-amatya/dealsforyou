const mongoose = require('mongoose');
const { MONGODB_URI } = require("../config/keys");
module.exports.connecMongo = async function () {
    console.log(MONGODB_URI);
    await mongoose.connect(MONGODB_URI);
    mongoose.Promise = global.Promise;
    const db = mongoose.connection;
    db.on('error', () => {
        console.error.bind(console, 'MongoDB connection error');
    });
    console.log('Database connected!');
};