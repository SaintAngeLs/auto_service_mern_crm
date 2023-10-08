const dbConfig = require("./dbConfig");

const mongoDBDriverConnectionString = `mongodb+srv://${dbConfig.DBUSER}:${dbConfig.PASSWORD}@cluster0.qwf5jx1.mongodb.net/?retryWrites=true&w=majority`;

module.exports = { mongoDBDriverConnectionString };