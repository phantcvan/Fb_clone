const mysql = require("mysql2");
require('dotenv').config();

let pool = mysql.createPool({
    host: process.env.HOST,
    database: process.env.DATABASE,
    user: process.env.USER,
    password: process.env.PASSWORD
});
module.exports = pool.promise();