const mongoose = require("mongoose");

const connect = async () => {
    mongoose.connect(global.__MONGO_URI__);
};

const close = async () => {
    await mongoose.connection.close();
};

const clear = async () => {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
        await collections[key].deleteMany({});
    }
};

module.exports = { connect, close, clear };