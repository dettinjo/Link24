
const mongoose = require('mongoose');
const connection = mongoose.connection;

const user = encodeURIComponent(process.env.MONGO_INITDB_ROOT_USERNAME);
const pass = encodeURIComponent(process.env.MONGO_INITDB_ROOT_PASSWORD);
const db = process.env.MONGO_INITDB_DATABASE || "link24";

const DB_URI = process.env.DB_URI || `mongodb://${user}:${pass}@database:27017/${db}?authMechanism=DEFAULT&authSource=admin`;

connection.once('connecting', () => console.log(`Trying to connect to ${DB_URI}...`));
connection.once('open', () => console.log('Successfully connected to db!'));
connection.on('error', () => console.log('Error while connection to DB!'));

mongoose.connect(DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  connectTimeoutMS: 1000,
});


module.exports = connection;
