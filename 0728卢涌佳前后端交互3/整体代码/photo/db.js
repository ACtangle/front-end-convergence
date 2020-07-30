const mysql = require("mysql2/promise");

const { mysqlParam } = require("./config/config");

let connection;
module.exports = {
  async initDB() {
    connection = await mysql.createConnection(mysqlParam);
  },

  getDB() {
    return connection;
  },
};