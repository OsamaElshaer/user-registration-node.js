const { db } = require("../config/database");
const mongodb = require("mongodb");

class User {
  constructor(username, password) {
    this.username = username;
    this.password = password;
  }
  save() {
    db().collection("users").insertOne(this);
  }

  static findByName(username) {
    return db().collection("users").findOne({ username: username });
  }



  static deleteMany() {
    return db().collection("users").deleteMany({});
  }

  static fetchAll() {
    return db().collection("users").find().toArray();
  }

  static findById(userId) {
    return db()
      .collection("users")
      .findOne({ _id: new mongodb.ObjectId(userId) });
  }
}
exports.User = User;
