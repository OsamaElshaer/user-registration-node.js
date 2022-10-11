require("dotenv").config();

const { MongoClient } = require("mongodb");
const url = process.env.URL_DB;
const dbName = "userManagment";
const clien = new MongoClient(url);

let database;

async function dbConnection(cb) {
  await clien.connect();
  database = clien.db(dbName);
  cb(database)

}

function db() {
  if (!database) {
    return new Error("can not reach db");
  }
  return database;
}

module.exports = {
  dbConnection,
  db,
  clien,
};
